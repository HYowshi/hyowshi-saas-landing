import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 7)

    const group = new THREE.Group()
    scene.add(group)

    const geometry = new THREE.TorusKnotGeometry(1.25, 0.32, 180, 24)
    const material = new THREE.MeshPhysicalMaterial({
      clearcoat: 0.8,
      color: '#f8fafc',
      metalness: 0.65,
      roughness: 0.22,
      transmission: 0.08,
    })
    const knot = new THREE.Mesh(geometry, material)
    group.add(knot)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.025, 12, 180),
      new THREE.MeshBasicMaterial({ color: '#22d3ee' }),
    )
    ring.rotation.x = Math.PI / 2.5
    group.add(ring)

    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 180
    const positions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.6 + Math.random() * 1.9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[index * 3 + 2] = radius * Math.cos(phi)
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: '#38bdf8',
        size: 0.025,
        transparent: true,
        opacity: 0.8,
      }),
    )
    group.add(particles)

    scene.add(new THREE.AmbientLight('#ffffff', 1.25))
    const keyLight = new THREE.PointLight('#67e8f9', 40, 16)
    keyLight.position.set(3, 4, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight('#f8fafc', 22, 12)
    fillLight.position.set(-4, -3, 3)
    scene.add(fillLight)

    const resize = () => {
      const { clientHeight, clientWidth } = canvas
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / Math.max(clientHeight, 1)
      camera.updateProjectionMatrix()
    }

    let frameId = 0
    const animate = () => {
      frameId = window.requestAnimationFrame(animate)
      group.rotation.y += 0.004
      group.rotation.x = Math.sin(Date.now() * 0.0005) * 0.12
      knot.rotation.z += 0.003
      particles.rotation.y -= 0.0018
      renderer.render(scene, camera)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      ring.geometry.dispose()
      ;(ring.material as THREE.Material).dispose()
      particlesGeometry.dispose()
      ;(particles.material as THREE.Material).dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="heroCanvas" aria-label="Animated WebGL portfolio object" />
}

export default HeroScene
