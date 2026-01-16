import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
        >
            <path
                d="M0 21H64L60.2215 22.9659L60.2143 36.2094L53.871 48.0627L56.2897 52.145L0 21Z"
                fill="#ED1C24"
            />
        </svg>
    );
}
