export const welcomeLabelVar = {
    from: { scale: 1 },
    to: { scale: 1, transition: { duration: 0.6 } },
    exit: { scale: 0, transition: { duration: 0.6 } },
};

export const soundWaveVar = {
    from: {
        opacity: 0,
        y: 20,
        rotateZ: "16deg",
    },
    to: {
        opacity: 1,
        y: 0,
        rotateZ: "16deg",
    },
    exit: {
        opacity: 0,
        y: -40,
        transition: { duration: 0.7 },
    },
};

export const fileVar = {
    from: {
        opacity: 0,
        x: -120,
        y: -60,
        transfrom: { scaleX: 0.1 },
        scaleX: 0.1,
        scaleY: 0.1,
    },

    to: {
        opacity: 1,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
    },

    exit: {
        opacity: 0,
        x: -120,
        y: -60,
        transition: { duration: 0.3 },
        scaleX: 0.1,
        scaleY: 0.1,
    },
};
