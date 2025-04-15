import React from "react";

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
            <video
                src="/loader.mp4"
                autoPlay
                playsInline
                muted
                className="h-90 w-auto"
                onEnded={() => null} // utile si tu veux faire quelque chose à la fin
            />
        </div>
    );
};

export default Preloader;
