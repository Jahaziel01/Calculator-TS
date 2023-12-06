import tw from "tailwind-styled-components";

interface SpanProps {
    $operator: boolean
}

export const CircleGradient = tw.div`
    sm:w-[600px]
    sm:h-[600px]
    bg-gradient-to-r from-cyan-500 to-blue-500
    rounded-full
    shadow-3xl
`;

export const Circle_1 = tw.div`
    hidden
    sm:block
    absolute
    top-20
    left-30
    w-[40px]
    h-[40px]
    bg-gray-950
    opacity-50
    rounded-1xl
    rotate-45
    z-10
`;

export const Circle_2 = tw.div`
    hidden
    sm:block    
    absolute
    top-20
    right-10
    w-[40px]
    h-[40px]
    bg-sky-500
    opacity-90
    rounded-2xl
    z-10
`;

export const BoxBlur = tw.div`
    absolute
    -top-12
    right-20
    w-[90px]
    h-[90px]
    bg-sky-500
    opacity-90
    rounded-full
    blur-3xl
    z-10
`;

export const Calculator = tw.div`
    relative
    sm:w-[330px]
    h-[620px]
    mx-auto
    bg-gray-950
    opacity-90
    rounded-3xl
    shwadow-3xl
    p-5
`;

export const BtnHistory = tw.button`
    absolute
    top-4
    right-4
`;

export const Screen = tw.div`
    w-full
    h-[220px]
    pt-20
    flex
    flex-col
    overflow-hidden
`;

export const SecondScreen = tw.span`
    h-1/2 
    w-full
    text-end
    text-gray-200
    text-2xl
`;
export const MainScreen = tw.span<SpanProps>`    
    h-1/2
    w-full
    text-end
    text-gray-200
    text-5xl
    ${(p) => (p.$operator ? "mb-10" : "mb-0")}
`;

export const Buttons = tw.div`
    w-full
    h-[360px]
    grid
    grid-cols-4
    grid-rows-4
    gap-4
`;

export const Button = tw.button`
    w-full
    h-full
    text-2xl
    text-gray-200
    border-1
    border-gray-800
    rounded-md
    p-3
    duration-200
    hover:text-gray-300
`;