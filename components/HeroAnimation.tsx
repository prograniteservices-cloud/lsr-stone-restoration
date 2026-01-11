import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const HeroAnimation: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Module aliases
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Common = Matter.Common;

    // Create an engine
    const engine = Engine.create();
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create a renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Create bounds
    const ground = Bodies.rectangle(width / 2, height + 30, width, 60, { 
      isStatic: true,
      render: { fillStyle: 'transparent' } 
    });
    
    const wallLeft = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true });
    const wallRight = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true });

    // Create falling letters (Represented as blocks for stability, could be SVG vertices in prod)
    // We will simulate P, G, S letters
    const letters: Matter.Body[] = [];
    const colors = ['#D4AF37', '#8a7020', '#333333'];
    const letterLabels = ['P', 'G', 'S'];

    letterLabels.forEach((label, index) => {
        const xPos = (width / 2) + ((index - 1) * 100);
        // Box representation of letters
        const body = Bodies.rectangle(xPos, -200 - (index * 100), 80, 80, {
            restitution: 0.6, // Bounciness
            render: {
                fillStyle: 'transparent',
                strokeStyle: colors[index],
                lineWidth: 2,
            }
        });
        
        // Custom property to draw text later if we hooked into afterRender
        (body as any).label = label; 
        letters.push(body);
    });

    // Add all of the bodies to the world
    Composite.add(engine.world, [ground, wallLeft, wallRight, ...letters]);

    // Run the renderer
    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Custom rendering for text inside the boxes
    const events = Matter.Events;
    events.on(render, 'afterRender', function() {
        const context = render.context;
        context.font = "bold 48px 'Playfair Display'";
        context.textAlign = "center";
        context.textBaseline = "middle";
        
        letters.forEach((body, i) => {
            const { x, y } = body.position;
            const angle = body.angle;
            
            context.save();
            context.translate(x, y);
            context.rotate(angle);
            context.fillStyle = colors[i];
            context.fillText(letterLabels[i], 0, 0);
            context.restore();
        });
    });

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
      <div ref={sceneRef} className="w-full h-full" />
    </div>
  );
};

export default HeroAnimation;