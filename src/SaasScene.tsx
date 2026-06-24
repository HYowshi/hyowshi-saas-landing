import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type SaasSceneProps = {
  className?: string
}

export default function SaasScene({ className }: SaasSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0.2, 8.4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    host.appendChild(renderer.domElement)

    const group = new THREE.Group()
    group.rotation.set(-0.42, -0.28, 0.08)
    scene.add(group)

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x17324a,
      metalness: 0.15,
      roughness: 0.22,
      transparent: true,
      opacity: 0.82,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
    })
    const cyan = new THREE.MeshBasicMaterial({ color: 0x7cf2ff, transparent: true, opacity: 0.88 })
    const blue = new THREE.MeshBasicMaterial({ color: 0x5875ff, transparent: true, opacity: 0.72 })
    const soft = new THREE.MeshBasicMaterial({ color: 0xdffbff, transparent: true, opacity: 0.3 })

    const shell = new THREE.Mesh(new THREE.BoxGeometry(4.9, 3.05, 0.14, 1, 1, 1), glass)
    shell.position.z = 0
    group.add(shell)

    const topBar = new THREE.Mesh(new THREE.BoxGeometry(4.55, 0.18, 0.035), cyan)
    topBar.position.set(0, 1.18, 0.12)
    group.add(topBar)

    for (let i = 0; i < 9; i += 1) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.18 + i * 0.06, 0.065, 0.04), i % 2 ? blue : cyan)
      bar.position.set(-1.9 + i * 0.46, 0.72 - (i % 3) * 0.36, 0.16)
      group.add(bar)
    }

    for (let i = 0; i < 5; i += 1) {
      const card = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.48, 0.06), soft)
      card.position.set(-1.7 + i * 0.85, -0.95 + Math.sin(i) * 0.15, 0.2)
      group.add(card)
    }

    const nodes = new THREE.Group()
    group.add(nodes)
    const nodePositions = [
      [-2.35, 1.48, 0.22],
      [2.15, 1.18, 0.22],
      [2.45, -1.2, 0.22],
      [-2.15, -1.42, 0.22],
      [0.1, 1.62, 0.22],
    ]

    nodePositions.forEach(([x, y, z], index) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(index === 4 ? 0.085 : 0.065, 24, 16), index % 2 ? blue : cyan)
      node.position.set(x, y, z)
      nodes.add(node)
    })

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7cf2ff, transparent: true, opacity: 0.42 })
    for (let i = 0; i < nodePositions.length; i += 1) {
      const next = nodePositions[(i + 1) % nodePositions.length]
      const points = [
        new THREE.Vector3(nodePositions[i][0], nodePositions[i][1], nodePositions[i][2]),
        new THREE.Vector3(next[0], next[1], next[2]),
      ]
      nodes.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial))
    }

    const orbit = new THREE.Group()
    group.add(orbit)
    for (let i = 0; i < 18; i += 1) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 8), i % 3 === 0 ? cyan : soft)
      const angle = (i / 18) * Math.PI * 2
      dot.position.set(Math.cos(angle) * 3.2, Math.sin(angle) * 2.1, 0.34 + Math.sin(angle * 2) * 0.1)
      orbit.add(dot)
    }

    const lightA = new THREE.DirectionalLight(0x7cf2ff, 3.8)
    lightA.position.set(2, 3, 4)
    scene.add(lightA)
    const lightB = new THREE.PointLight(0x5875ff, 8, 9)
    lightB.position.set(-2.8, -1.6, 2)
    scene.add(lightB)

    const pointer = new THREE.Vector2()
    let scrollProgress = 0
    let frame = 0
    const clock = new THREE.Clock()

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
      group.rotation.y += (-0.28 + pointer.x * 0.16 + scrollProgress * 1.1 - group.rotation.y) * 0.045
      group.rotation.x += (-0.42 - pointer.y * 0.1 + Math.sin(elapsed * 0.5) * 0.04 - group.rotation.x) * 0.045
      orbit.rotation.z -= 0.006
      nodes.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) child.scale.setScalar(1 + Math.sin(elapsed * 2 + index) * 0.12)
      })
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
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
          else object.material.dispose()
        }
        if (object instanceof THREE.Line) object.geometry.dispose()
      })
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={hostRef} className={className} />
}
