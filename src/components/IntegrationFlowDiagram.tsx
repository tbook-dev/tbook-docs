import React from 'react';

export default function IntegrationFlowDiagram(): React.ReactElement {
  return (
    <div style={{ width: '100%', height: 'auto', overflowX: 'auto' }}>
      <svg className="diagram" viewBox="0 0 1500 700" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <style>{`
            .nm { font: 600 15px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #1a1f36; }
            .ns { font: 400 12px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; }
            .edge { font: 600 13px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; }
            .ep { fill: #635bff; }
            .eg { fill: #0e9f6e; }
            .eb { fill: #2563eb; }
            .code { font: 600 13px 'SF Mono', 'Fira Code', 'Consolas', monospace; fill: #635bff; }
            .badge { font: 500 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #697386; }
            .zt { font: 700 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; letter-spacing: 0.8px; }
            .sect { font: 600 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; letter-spacing: 1.2px; }
            .st { font: 600 13px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #1a1f36; }
            .ss { font: 400 12px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; }
          `}</style>
          <marker id="i-mp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#c4b5fd"/></marker>
          <marker id="i-mg" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#86efac"/></marker>
          <marker id="i-mb" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#93c5fd"/></marker>
          <marker id="i-md" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#d3d8e0"/></marker>
          <filter id="i-sh" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#1a1f36" floodOpacity="0.06"/>
          </filter>
          <linearGradient id="i-zgb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="i-zgp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8f6ff" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#f0edff" stopOpacity="0.2"/>
          </linearGradient>
        </defs>

        {/* Zones */}
        <rect x="30" y="30" width="420" height="480" rx="18" fill="url(#i-zgb)" stroke="#bfdbfe" strokeWidth="1"/>
        <text className="zt" x="54" y="58" fill="#2563eb">YOUR PLATFORM</text>
        <rect x="510" y="30" width="330" height="480" rx="18" fill="url(#i-zgp)" stroke="#e8e5f5" strokeWidth="1"/>
        <text className="zt" x="534" y="58" fill="#635bff">TBOOK SDK / API</text>
        <rect x="900" y="30" width="570" height="480" rx="18" fill="#fafafa" stroke="#e3e8ee" strokeWidth="1"/>
        <text className="sect" x="924" y="58">TBOOK YIELD INFRASTRUCTURE</text>

        {/* Connections */}
        <path d="M 340,155 L 530,155" fill="none" stroke="#93c5fd" strokeWidth="2" markerEnd="url(#i-mb)"/>
        <text className="code" x="378" y="142">{"buildDeposit()"}</text>
        <path d="M 530,205 L 340,205" fill="none" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#i-mp)"/>
        <text className="edge ep" x="390" y="228">Unsigned TX</text>
        <path d="M 340,350 C 540,350 680,310 940,200" fill="none" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#i-mp)"/>
        <text className="edge ep" x="590" y="330">{"Sign & Submit"}</text>
        <path d="M 830,155 L 940,155" fill="none" stroke="#93c5fd" strokeWidth="2" markerEnd="url(#i-mb)"/>
        <text className="edge eb" x="850" y="142">Read</text>
        <path d="M 940,205 L 830,205" fill="none" stroke="#86efac" strokeWidth="2" markerEnd="url(#i-mg)"/>
        <text className="edge eg" x="848" y="228">Vault Info</text>
        <path d="M 1100,155 L 1230,155" fill="none" stroke="#d3d8e0" strokeWidth="2" markerEnd="url(#i-md)"/>
        <text className="ns" x="1125" y="142">Allocation</text>
        <path d="M 1230,230 L 1070,390" fill="none" stroke="#86efac" strokeWidth="2" markerEnd="url(#i-mg)"/>
        <text className="edge eg" x="1120" y="300">Yield</text>
        <path d="M 940,400 L 830,350" fill="none" stroke="#86efac" strokeWidth="2" markerEnd="url(#i-mg)"/>
        <text className="edge eg" x="848" y="395">Share Price</text>
        <path d="M 530,370 L 340,400" fill="none" stroke="#86efac" strokeWidth="2" markerEnd="url(#i-mg)"/>
        <text className="edge eg" x="385" y="400">Portfolio Data</text>

        {/* Frontend */}
        <g filter="url(#i-sh)">
          <circle cx="220" cy="175" r="48" fill="#fff" stroke="#93c5fd" strokeWidth="2"/>
          <rect x="194" y="155" width="52" height="36" rx="5" fill="none" stroke="#2563eb" strokeWidth="1.5"/>
          <line x1="194" y1="167" x2="246" y2="167" stroke="#2563eb" strokeWidth="1.3"/>
          <circle cx="202" cy="161" r="2.5" fill="#2563eb"/>
          <circle cx="209" cy="161" r="2.5" fill="#2563eb"/>
          <circle cx="216" cy="161" r="2.5" fill="#2563eb"/>
        </g>
        <text className="nm" x="220" y="246" textAnchor="middle">Frontend</text>
        <text className="ns" x="220" y="264" textAnchor="middle">User Interface</text>

        {/* Wallet */}
        <g filter="url(#i-sh)">
          <circle cx="220" cy="360" r="44" fill="#fff" stroke="#e3e8ee" strokeWidth="1.5"/>
          <rect x="196" y="344" width="44" height="28" rx="4" fill="none" stroke="#697386" strokeWidth="1.5"/>
          <rect x="220" y="352" width="18" height="12" rx="2.5" fill="none" stroke="#697386" strokeWidth="1.3"/>
          <circle cx="232" cy="358" r="3" fill="#697386"/>
        </g>
        <text className="nm" x="220" y="426" textAnchor="middle">Wallet</text>
        <text className="ns" x="220" y="444" textAnchor="middle">Signing Keys</text>

        <line x1="220" y1="224" x2="220" y2="316" stroke="#d3d8e0" strokeWidth="1" strokeDasharray="5 5"/>

        {/* Client SDK */}
        <g filter="url(#i-sh)">
          <circle cx="675" cy="175" r="48" fill="#fff" stroke="#c4b5fd" strokeWidth="2"/>
          <text x="675" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#635bff" fontFamily="SF Mono, Consolas, monospace">{"</>"}</text>
          <text x="675" y="188" textAnchor="middle" fontSize="11" fill="#635bff" fontFamily="-apple-system, sans-serif">SDK</text>
        </g>
        <text className="nm" x="675" y="246" textAnchor="middle">Client SDK</text>
        <text className="ns" x="675" y="264" textAnchor="middle">Transaction Builder</text>

        {/* State Query */}
        <g filter="url(#i-sh)">
          <circle cx="675" cy="370" r="42" fill="#fff" stroke="#c4b5fd" strokeWidth="1.5"/>
          <rect x="655" y="356" width="40" height="26" rx="4" fill="none" stroke="#635bff" strokeWidth="1.3"/>
          <text x="675" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#635bff" fontFamily="SF Mono, Consolas, monospace">API</text>
        </g>
        <text className="nm" x="675" y="434" textAnchor="middle">State Query</text>
        <text className="ns" x="675" y="452" textAnchor="middle">{"Portfolio & NAV"}</text>

        <line x1="675" y1="224" x2="675" y2="328" stroke="#d3d8e0" strokeWidth="1" strokeDasharray="5 5"/>

        {/* TBook Vault */}
        <g filter="url(#i-sh)">
          <circle cx="1020" cy="175" r="54" fill="#fff" stroke="#c4b5fd" strokeWidth="2"/>
          <path d="M 994,204 L 994,168 L 1020,152 L 1046,168 L 1046,204" fill="none" stroke="#635bff" strokeWidth="2" strokeLinejoin="round"/>
          <line x1="994" y1="204" x2="1046" y2="204" stroke="#635bff" strokeWidth="2"/>
          <line x1="994" y1="168" x2="1046" y2="168" stroke="#635bff" strokeWidth="1.2" opacity="0.3"/>
          <line x1="1005" y1="204" x2="1005" y2="174" stroke="#635bff" strokeWidth="1.3"/>
          <line x1="1020" y1="204" x2="1020" y2="168" stroke="#635bff" strokeWidth="1.3"/>
          <line x1="1035" y1="204" x2="1035" y2="174" stroke="#635bff" strokeWidth="1.3"/>
        </g>
        <text className="nm" x="1020" y="252" textAnchor="middle">TBook Vault</text>
        <text className="ns" x="1020" y="272" textAnchor="middle">Smart Contract</text>

        {/* RWA Assets */}
        <g filter="url(#i-sh)">
          <circle cx="1310" cy="155" r="48" fill="#fff" stroke="#86efac" strokeWidth="2"/>
          <path d="M 1286,178 L 1286,146 L 1310,132 L 1334,146 L 1334,178" fill="none" stroke="#0e9f6e" strokeWidth="1.8" strokeLinejoin="round"/>
          <line x1="1286" y1="178" x2="1334" y2="178" stroke="#0e9f6e" strokeWidth="1.8"/>
        </g>
        <text className="nm" x="1310" y="224" textAnchor="middle">RWA Assets</text>
        <text className="ns" x="1310" y="244" textAnchor="middle">{"T-Bills & more"}</text>

        {/* NAV Oracle */}
        <g filter="url(#i-sh)">
          <circle cx="1020" cy="400" r="44" fill="#fff" stroke="#fde68a" strokeWidth="2"/>
          <polyline points="998,420 1010,408 1020,414 1042,392" fill="none" stroke="#ca8a04" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="1032,392 1042,392 1042,402" fill="none" stroke="#ca8a04" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <text className="nm" x="1020" y="466" textAnchor="middle">NAV Oracle</text>
        <text className="ns" x="1020" y="486" textAnchor="middle">Share Pricing</text>

        {/* Multisig badge */}
        <rect x="1200" y="430" width="158" height="32" rx="9" fill="#fff" stroke="#e3e8ee" strokeWidth="1"/>
        <rect x="1216" y="440" width="11" height="8" rx="2" fill="none" stroke="#697386" strokeWidth="1.2"/>
        <path d="M 1218,440 L 1218,437 A 4,4 0 0 1 1225,437 L 1225,440" fill="none" stroke="#697386" strokeWidth="1.2"/>
        <text className="badge" x="1233" y="450">Multisig Governed</text>
        <line x1="1020" y1="444" x2="1200" y2="446" stroke="#d3d8e0" strokeWidth="1" strokeDasharray="4 4"/>

        {/* Integration steps */}
        <line x1="40" y1="540" x2="1460" y2="540" stroke="#e3e8ee" strokeWidth="1"/>
        <text className="sect" x="40" y="570">INTEGRATION STEPS</text>

        <circle cx="58" cy="604" r="13" fill="#eff6ff"/>
        <text x="58" y="609" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">1</text>
        <text className="st" x="80" y="600">Install SDK</text>
        <text className="ss" x="80" y="618">npm install @tbook/vault-sdk</text>

        <circle cx="330" cy="604" r="13" fill="#f0f0ff"/>
        <text x="330" y="609" textAnchor="middle" fontSize="13" fontWeight="700" fill="#635bff">2</text>
        <text className="st" x="352" y="600">Build transactions</text>
        <text className="ss" x="352" y="618">SDK returns unsigned TX</text>

        <circle cx="610" cy="604" r="13" fill="#f0f0ff"/>
        <text x="610" y="609" textAnchor="middle" fontSize="13" fontWeight="700" fill="#635bff">3</text>
        <text className="st" x="632" y="600">Sign with user wallet</text>
        <text className="ss" x="632" y="618">You control signing keys</text>

        <circle cx="910" cy="604" r="13" fill="#ecfdf5"/>
        <text x="910" y="609" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e9f6e">4</text>
        <text className="st" x="932" y="600">Monitor portfolio</text>
        <text className="ss" x="932" y="618">Query shares, yield, NAV</text>

        <circle cx="1200" cy="604" r="13" fill="#ecfdf5"/>
        <text x="1200" y="609" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e9f6e">5</text>
        <text className="st" x="1222" y="600">Display to customers</text>
        <text className="ss" x="1222" y="618">Yield, balance, history</text>

        {/* Badges */}
        <g transform="translate(40, 650)">
          <rect x="0" y="0" width="130" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="16" y="20">{"\uD83D\uDD12 Non-custodial"}</text>

          <rect x="144" y="0" width="162" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="160" y="20">{"\uD83D\uDD27 You control signing"}</text>

          <rect x="320" y="0" width="160" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="336" y="20">{"\u26A1 5-min integration"}</text>

          <rect x="494" y="0" width="196" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="510" y="20">{"\uD83D\uDE80 SDK + REST API + Hooks"}</text>
        </g>
      </svg>
    </div>
  );
}
