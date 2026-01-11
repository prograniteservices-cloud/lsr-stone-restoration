import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
      };
    }
  }
}

const ElevenLabsWidget: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* @ts-ignore */}
      <elevenlabs-convai agent-id="agent_9301keqcmevce7m9tt74y0kedh0p"></elevenlabs-convai>
    </div>
  );
};

export default ElevenLabsWidget;