import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export function InteractiveRoom({ activeSection, onSectionClick, hoveredNode, setHoveredNode, ...props }) {
  const { nodes, materials } = useGLTF('/room/scene.gltf')
  const { nodes: diplomaNodes, materials: diplomaMaterials } = useGLTF('/diploma_frame/scene.gltf')
  const chairRef = useRef()

  const handlePointerOver = (name) => (e) => { 
    e.stopPropagation(); 
    if (!activeSection) setHoveredNode(name); 
  };
  
  const handlePointerOut = () => (e) => { 
    e.stopPropagation(); 
    setHoveredNode(null); 
  };
  
  const handleClick = (name) => (e) => { 
    e.stopPropagation(); 
    if (!activeSection) onSectionClick(name); 
  };

  // Animate the chair rotation when activeSection is 'chair'
  React.useEffect(() => {
    if (chairRef.current) {
      if (activeSection === 'chair') {
        // Rotate 45 degrees horizontally (Math.PI / 4)
        gsap.to(chairRef.current.rotation, {
          y: Math.PI / 4,
          duration: 1.0,
          ease: "back.out(1.7)"
        });
      } else {
        // Return to original rotation (0 since it's a wrapper)
        gsap.to(chairRef.current.rotation, {
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    }
  }, [activeSection]);



  return (
    <group {...props} dispose={null}>
      {/* Static Room Architecture */}
      <group position={[0.095, -0.373, 0.14]} scale={4.819}>
        <mesh receiveShadow castShadow geometry={nodes.Object_4.geometry} material={materials.pared} />
        <mesh receiveShadow geometry={nodes.Object_5.geometry} material={materials.suelo} />
        <mesh receiveShadow geometry={nodes.Object_6.geometry} material={materials.afuera} />
        <mesh receiveShadow geometry={nodes.Object_8.geometry} material={materials.negro} />

        {/* Static but Interactive Door */}
        <mesh 
          receiveShadow 
          geometry={nodes.Object_7.geometry} 
          onClick={handleClick('contact')}
          onPointerOver={handlePointerOver('door')}
          onPointerOut={handlePointerOut()}
        >
           <meshStandardMaterial 
              color={materials.puerta.color} 
              map={materials.puerta.map}
              emissive={hoveredNode === 'door' ? '#fbbf24' : '#000000'}
              emissiveIntensity={1}
           />
        </mesh>

        {/* Door Knob (Handle) - Static and correctly positioned */}
        <mesh 
          geometry={nodes.Object_44.geometry} 
          material={materials.gris}
          position={[-4.157 / 4.819, 2.42 / 4.819, 4.442 / 4.819]} 
          rotation={[0, 0, -Math.PI / 2]} 
          scale={0.111 / 4.819}
          onClick={handleClick('contact')}
          onPointerOver={handlePointerOver('door')}
          onPointerOut={handlePointerOut()}
        />
      </group>



      {/* PHOTO FRAME ON WALL (Aligned to the grey wall) */}
      <group position={[-4.7, 4.5, -1.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh 
           onClick={handleClick('photo')}
           onPointerOver={handlePointerOver('photo')}
           onPointerOut={handlePointerOut()}
        >
          <planeGeometry args={[2, 2.5]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent
            opacity={0.9}
            emissive={hoveredNode === 'photo' ? '#ffffff' : '#000000'}
            emissiveIntensity={hoveredNode === 'photo' ? 0.5 : 0}
          />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2.2, 2.7]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>

      {/* DIPLOMA FRAME ON WALL (Education) - Moved even further forward */}
      <group position={[3.2, 4.8, -4.2]} rotation={[0, 0, 0]} scale={0.3}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={5}> {/* Significantly reduced scale */}
          <mesh 
            geometry={diplomaNodes.pCube1_lambert1_0.geometry} 
            material={diplomaMaterials.lambert1} 
            scale={[0.663, 0.061, 0.802]} 
            onClick={handleClick('bookshelf')}
            onPointerOver={handlePointerOver('diploma')}
            onPointerOut={handlePointerOut()}
          >
            <meshStandardMaterial 
              {...diplomaMaterials.lambert1}
              emissive={hoveredNode === 'diploma' ? '#6366f1' : '#000000'}
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      </group>
      
      {/* Bed (Non-interactive now) */}
      <group position={[-1.049, -0.692, 1.149]} scale={1.419}>
        <mesh receiveShadow castShadow geometry={nodes.Object_16.geometry} material={materials.base_cama} />
        <mesh receiveShadow castShadow geometry={nodes.Object_17.geometry} material={materials.colchon} />
      </group>

      <group position={[-3.882, 1.509, -2.596]} scale={0.12}>
        <mesh castShadow geometry={nodes.Object_25.geometry} material={materials['Material.001']} />
        <mesh castShadow geometry={nodes.Object_26.geometry} material={materials['Material.002']} />
      </group>

      {/* PC Case Interactive */}
      <group position={[-3.958, 1.431, -3.489]} scale={0.077}>
        <mesh castShadow geometry={nodes.Object_30.geometry} material={materials.negro} />
        <mesh 
          castShadow 
          geometry={nodes.Object_31.geometry}
          onClick={handleClick('pc')}
          onPointerOver={handlePointerOver('pc')}
          onPointerOut={handlePointerOut()}
        >
          <meshStandardMaterial 
            color={materials.pcinsidenormal.color} 
            map={materials.pcinsidenormal.map} 
            roughness={materials.pcinsidenormal.roughness}
            metalness={materials.pcinsidenormal.metalness}
            emissive={hoveredNode === 'pc' ? '#10b981' : '#000000'}
            emissiveIntensity={2} 
          />
        </mesh>
      </group>

      {/* PC Screen Interactive (Keyboard) */}
      <group position={[-3.781, 2.47, -1.132]} scale={1.456}>
        <mesh castShadow geometry={nodes.Object_33.geometry} material={materials.negro} />
        <mesh 
          castShadow 
          geometry={nodes.Object_34.geometry}
          onClick={handleClick('keyboard')}
          onPointerOver={handlePointerOver('keyboard')}
          onPointerOut={handlePointerOut()}
        >
          <meshStandardMaterial 
            color={materials.screen.color} 
            map={materials.screen.map} 
            roughness={materials.screen.roughness}
            metalness={materials.screen.metalness}
            emissive={hoveredNode === 'keyboard' ? '#00e5ff' : '#000000'}
            emissiveIntensity={2} 
          />
        </mesh>
      </group>

      {/* Mouse & Keyboard */}
      <group position={[-2.793, 1.422, -2.237]} scale={[0.137, 0.04, 0.083]}>
        <mesh castShadow geometry={nodes.Object_36.geometry} material={materials.negro} />
        <mesh castShadow geometry={nodes.Object_37.geometry} material={materials.light} />
      </group>
      
      {/* Keyboard Interactive */}
      <group position={[-2.859, 1.4, -1.158]} scale={[0.266, 0.019, 0.797]}>
        <mesh castShadow geometry={nodes.Object_41.geometry} material={materials.negro} />
        <mesh 
          castShadow 
          geometry={nodes.Object_42.geometry}
          onClick={handleClick('keyboard')}
          onPointerOver={handlePointerOver('keyboard')}
          onPointerOut={handlePointerOut()}
        >
          <meshStandardMaterial 
            color={materials.material.color} 
            map={materials.material.map}
            roughness={materials.material.roughness}
            metalness={materials.material.metalness}
            emissive={hoveredNode === 'keyboard' ? '#00e5ff' : '#000000'} 
            emissiveIntensity={2} 
          />
        </mesh>
      </group>

      {/* Bookshelf / Book Interactive */}
      <group position={[-2.771, 4.559, -3.744]} rotation={[Math.PI, 0, 2.849]} scale={[0.085, 0.433, 0.303]}>
        <mesh castShadow geometry={nodes.Object_54.geometry} material={materials.pages} />
        <mesh 
          castShadow 
          geometry={nodes.Object_55.geometry}
          onClick={handleClick('bookshelf')}
          onPointerOver={handlePointerOver('bookshelf')}
          onPointerOut={handlePointerOut()}
        >
          <meshStandardMaterial 
            color={materials.libro.color} 
            map={materials.libro.map}
            roughness={materials.libro.roughness}
            metalness={materials.libro.metalness}
            emissive={hoveredNode === 'bookshelf' ? '#3b82f6' : '#000000'} 
            emissiveIntensity={0.8} 
          />
        </mesh>
      </group>

      {/* Various clutter objects */}
      <mesh castShadow geometry={nodes.Object_10.geometry} material={materials.material_0} position={[-3.66, 0.011, 1.339]} scale={0.577} />
      <mesh castShadow geometry={nodes.Object_12.geometry} material={materials.material_0} position={[-3.492, 0.078, 1.435]} rotation={[0, 0, -0.878]} scale={0.577} />
      <mesh castShadow geometry={nodes.Object_14.geometry} material={materials.negro} position={[-3.58, 0.515, 1.407]} scale={0.394} />
      <mesh receiveShadow castShadow geometry={nodes.Object_19.geometry} material={materials.sabanas} position={[3.11, 0.988, -3.333]} rotation={[0.604, 0, 0]} scale={[1.205, 1.596, 1.205]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_21.geometry} material={materials.sabanas} position={[3.211, 1.29, -0.072]} scale={[2.502, 1.205, 3.534]} />
      <mesh castShadow geometry={nodes.Object_23.geometry} material={materials.negro} position={[-2.845, 1.371, -1.386]} scale={1.205} />
      <mesh castShadow geometry={nodes.Object_28.geometry} material={materials.base_cama} position={[-2.943, 1.349, -2.506]} scale={[1.205, 0.12, 1.205]} />
      
      {/* Nightstand & Lamp */}
      <group position={[0.261, 0.659, -2.511]} rotation={[-Math.PI, 0, 0]} scale={[-0.296, 0.034, 0.034]}>
        <mesh castShadow geometry={nodes.Object_46.geometry} material={materials.base_cama} />
        <mesh castShadow geometry={nodes.Object_47.geometry} material={materials.gris} />
      </group>
      <group position={[0.245, 1.026, -3.312]} scale={[0.316, 0.045, 0.316]}>
        <mesh castShadow geometry={nodes.Object_49.geometry} material={materials.lamapra} />
        <mesh castShadow geometry={nodes.Object_50.geometry} material={materials.negro} />
      </group>

      {/* CHAIR INTERACTIVE AND ROTATING */}
      <group position={[-2.496, -0.292, -0.907]} ref={chairRef}>
        <mesh 
          castShadow 
          geometry={nodes.Object_39.geometry} 
          position={[0, 0, 0]} // Shifted to local origin
          rotation={[-0.498, -1.215, 1.1]} // original rotation
          scale={0.083}
          onClick={handleClick('chair')}
          onPointerOver={handlePointerOver('chair')}
          onPointerOut={handlePointerOut()}
        >
          <meshStandardMaterial 
            color={materials.silla2.color} 
            map={materials.silla2.map}
            roughness={materials.silla2.roughness}
            metalness={materials.silla2.metalness}
            emissive={hoveredNode === 'chair' ? '#d946ef' : '#000000'} /* Fuchsia */
            emissiveIntensity={1.5} 
          />
        </mesh>
      </group>
      

      <mesh castShadow geometry={nodes.Object_52.geometry} material={materials.base_cama} position={[-2.92, 4.041, -3.764]} scale={[1.205, 0.086, 0.455]} />
    </group>
  )
}

useGLTF.preload('/room/scene.gltf')
useGLTF.preload('/diploma_frame/scene.gltf')
