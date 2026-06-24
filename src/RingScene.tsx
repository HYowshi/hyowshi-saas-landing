import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type RingSceneProps = {
  className?: string
}

export default function RingScene({ className }: RingSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0.45, 7.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    host.appendChild(renderer.domElement)

    const ringGroup = new THREE.Group()
    ringGroup.rotation.set(-0.54, 0.32, -0.18)
    scene.add(ringGroup)

    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf2c86b,
      metalness: 1,
      roughness: 0.18,
      clearcoat: 0.75,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.4,
    })

    const roseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffb48f,
      metalness: 1,
      roughness: 0.22,
      clearcoat: 0.6,
      envMapIntensity: 1.1,
    })

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.02,
      transmission: 0.64,
      transparent: true,
      opacity: 0.92,
      ior: 2.4,
      thickness: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0,
    })

    const band = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.115, 32, 160), goldMaterial)
    band.scale.set(1.06, 1, 0.86)
    ringGroup.add(band)

    const innerBand = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.035, 18, 140), roseMaterial)
    innerBand.scale.set(1.065, 1.01, 0.865)
    innerBand.position.z = -0.02
    ringGroup.add(innerBand)

    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.46, 3), diamondMaterial)
    gem.position.set(0, 1.35, 0.28)
    gem.rotation.set(0.24, 0.48, 0.28)
    gem.scale.set(1, 0.82, 1)
    ringGroup.add(gem)

    const crown = new THREE.Group()
    crown.position.set(0, 1.18, 0.18)
    ringGroup.add(crown)

    for (let i = 0; i < 6; i += 1) {
      const angle = (i / 6) * Math.PI * 2
      const prong = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.043, 0.52, 12), goldMaterial)
      prong.position.set(Math.cos(angle) * 0.36, Math.sin(angle) * 0.14 + 0.05, Math.sin(angle) * 0.36)
      prong.rotation.set(0.42, 0, angle)
      crown.add(prong)
    }

    for (let i = 0; i < 18; i += 1) {
      const side = i < 9 ? -1 : 1
      const offset = i % 9
      const angle = side * (0.38 + offset * 0.12)
      const stone = new THREE.Mesh(new THREE.OctahedronGeometry(0.075, 1), diamondMaterial)
      stone.position.set(Math.sin(angle) * 1.42, Math.cos(angle) * 1.42, 0.22)
      stone.rotation.set(0.6, angle, 0.2)
      ringGroup.add(stone)
    }

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.63, 0.012, 12, 96),
      new THREE.MeshBasicMaterial({ color: 0xffe9b0, transparent: true, opacity: 0.34 }),
    )
    halo.position.set(0, 1.35, 0.18)
    halo.rotation.x = Math.PI / 2
    ringGroup.add(halo)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const envScene = new THREE.Scene()
    const gradientCanvas = document.createElement('canvas')
    gradientCanvas.width = 16
    gradientCanvas.height = 16
    const context = gradientCanvas.getContext('2d')
    if (context) {
      const gradient = context.createLinearGradient(0, 0, 16, 16)
      gradient.addColorStop(0, '#fff6d8')
      gradient.addColorStop(0.42, '#55320c')
      gradient.addColorStop(1, '#030201')
      context.fillStyle = gradient
      context.fillRect(0, 0, 16, 16)
    }
    const envTexture = new THREE.CanvasTexture(gradientCanvas)
    envScene.background = envTexture
    scene.environment = pmrem.fromScene(envScene).texture

    const keyLight = new THREE.DirectionalLight(0xfff2c2, 4.5)
    keyLight.position.set(3, 4, 5)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x9ed8ff, 1.7)
    rimLight.position.set(-4, 1.8, -3)
    scene.add(rimLight)

    const warmPoint = new THREE.PointLight(0xf6c35c, 12, 10)
    warmPoint.position.set(-2.4, -1.8, 2.4)
    scene.add(warmPoint)

    const pointer = new THREE.Vector2()
    const clock = new THREE.Clock()
    let scrollProgress = 0
    let frame = 0

    const resize = () => {
      const width = Math.max(host.clientWidth, 1)
      const height = Math.max(host.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const updateScroll = () => {
      const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      scrollProgress = window.scrollY / pageHeight
    }

    const updatePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    window.addEventListener('scroll', updateScroll, { passive: true })
    host.addEventListener('pointermove', updatePointer)
    resize()
    updateScroll()

    const animate = () => {
      frame = window.requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()
      const targetY = 0.34 + scrollProgress * Math.PI * 1.75 + pointer.x * 0.12
      const targetX = -0.54 + Math.sin(elapsed * 0.45) * 0.08 - pointer.y * 0.1
      ringGroup.rotation.y += (targetY - ringGroup.rotation.y) * 0.055
      ringGroup.rotation.x += (targetX - ringGroup.rotation.x) * 0.055
      gem.rotation.y += 0.006
      halo.rotation.z -= 0.008
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', updateScroll)
      host.removeEventListener('pointermove', updatePointer)
      host.removeChild(renderer.domElement)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
      envTexture.dispose()
      pmrem.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={hostRef} className={className} />
}
