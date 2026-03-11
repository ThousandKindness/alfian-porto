import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { InteractiveRoom } from './RoomModel';

function CameraController({ activeSection }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    let targetPos = { x: 0, y: 0, z: 0 };
    let cameraPos = { x: 10, y: 10, z: 10 };
    let zoomLevel = 50;

    if (activeSection === 'keyboard') {
      targetPos = { x: -2.8, y: 1.4, z: -1.1 };
      cameraPos = { x: 0, y: 3, z: 2 };
      zoomLevel = 150;
    } else if (activeSection === 'bookshelf') {
      targetPos = { x: -2.7, y: 4.5, z: -3.7 };
      cameraPos = { x: 0, y: 6, z: 0 };
      zoomLevel = 130;
    } else if (activeSection === 'chair') {
      targetPos = { x: -2.8, y: 1.4, z: -2.2 };
      cameraPos = { x: 0, y: 4, z: 2 };
      zoomLevel = 140;
    } else if (activeSection === 'pc') {
      targetPos = { x: -4, y: 1.4, z: -3.5 };
      cameraPos = { x: -1, y: 4, z: 0 };
      zoomLevel = 160;
    } else if (activeSection === 'contact') {
      targetPos = { x: 4, y: 2, z: 4 };
      cameraPos = { x: 8, y: 5, z: 8 };
      zoomLevel = 120;
    } else if (activeSection === 'photo') {
      targetPos = { x: -4, y: 4, z: 0 };
      cameraPos = { x: 0, y: 4, z: 5 };
      zoomLevel = 180;
    } else if (activeSection === 'bookshelf') {
      targetPos = { x: 2.8, y: 4.8, z: -4 }; 
      cameraPos = { x: 2.8, y: 5, z: 5 };
      zoomLevel = 180;
    }

    // Animate Camera position
    gsap.to(camera.position, {
      x: cameraPos.x, y: cameraPos.y, z: cameraPos.z,
      duration: 1.5,
      ease: "power3.inOut"
    });
    
    // Animate Camera zoom (Orthographic only)
    gsap.to(camera, {
      zoom: zoomLevel,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => camera.updateProjectionMatrix()
    });

    // Animate the controls target (look at point)
    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: targetPos.x, y: targetPos.y, z: targetPos.z,
        duration: 1.5,
        ease: "power3.inOut"
      });
    }

  }, [activeSection, camera]);

  return (
    <OrbitControls 
      ref={controlsRef}
      enableDamping
      maxPolarAngle={Math.PI / 2} 
      minZoom={20}
      maxZoom={250}
    />
  );
}

export default function Scene({ activeSection, onSectionClick }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    document.body.style.cursor = hoveredNode && !activeSection ? 'pointer' : 'auto';
  }, [hoveredNode, activeSection]);

  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={50} near={-100} far={100} />
        
        <CameraController activeSection={activeSection} />

        <ambientLight intensity={1.5} />
        <directionalLight castShadow position={[10, 20, 10]} intensity={2.5} shadow-mapSize={[2048, 2048]} />

        <Suspense fallback={null}>
          <InteractiveRoom 
            position={[0, -1, 0]}
            scale={[1.5, 1.5, 1.5]}
            activeSection={activeSection} 
            onSectionClick={onSectionClick} 
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
          />
        </Suspense>

        <ContactShadows resolution={1024} scale={30} blur={2} opacity={0.4} far={10} color="#000000" position={[0, -1.1, 0]} />
      </Canvas>
    </div>
  );
}
