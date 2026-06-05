type VCCPLogoProps = { size?: number };

export default function VCCPLogo({ size = 48 }: VCCPLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="48" fill="#1A1208" stroke="#C9A84C" strokeWidth="2" />
      {/* Inner decorative ring */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#8B6914" strokeWidth="0.5" strokeDasharray="3,3" />
      {/* Car silhouette */}
      <g transform="translate(15, 42)">
        {/* Car body */}
        <rect x="5" y="8" width="60" height="12" rx="3" fill="#C9A84C" />
        {/* Car roof */}
        <polygon points="15,8 22,0 48,0 55,8" fill="#C9A84C" />
        {/* Windows */}
        <polygon points="17,7 23,1 34,1 34,7" fill="#1A1208" opacity="0.8" />
        <polygon points="36,7 36,1 46,1 52,7" fill="#1A1208" opacity="0.8" />
        {/* Wheels */}
        <circle cx="18" cy="20" r="6" fill="#1A1208" stroke="#C9A84C" strokeWidth="1.5" />
        <circle cx="18" cy="20" r="3" fill="#C9A84C" opacity="0.6" />
        <circle cx="52" cy="20" r="6" fill="#1A1208" stroke="#C9A84C" strokeWidth="1.5" />
        <circle cx="52" cy="20" r="3" fill="#C9A84C" opacity="0.6" />
        {/* Headlight */}
        <rect x="63" y="12" width="5" height="4" rx="1" fill="#FFE680" opacity="0.9" />
        {/* Bumper detail */}
        <rect x="0" y="16" width="4" height="3" rx="1" fill="#C9A84C" />
      </g>
      {/* Text: VCCP */}
      <text x="50" y="88" textAnchor="middle" fontSize="10" fill="#C9A84C" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="3">
        VCCP
      </text>
    </svg>
  );
}
