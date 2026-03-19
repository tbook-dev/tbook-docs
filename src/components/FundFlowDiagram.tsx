import React from 'react';

export default function FundFlowDiagram(): React.ReactElement {
  return (
    <div style={{ width: '100%', height: 'auto', overflowX: 'auto' }}>
      <svg className="diagram" viewBox="0 0 1600 750" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <style>{`
            .nm { font: 600 16px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #1a1f36; }
            .ns { font: 400 12px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; }
            .edge { font: 600 15px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; }
            .ep { fill: #635bff; }
            .eg { fill: #0e9f6e; }
            .ei { fill: #ca8a04; }
            .badge { font: 500 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #697386; }
            .zt { font: 700 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #635bff; letter-spacing: 0.8px; }
            .st { font: 600 13px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #1a1f36; }
            .ss { font: 400 12px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; }
            .sect { font: 600 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; letter-spacing: 1.2px; }
          `}</style>
          {/* Purple arrow (fund flow) */}
          <marker id="mp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#c4b5fd"/></marker>
          {/* Green arrow (return flow) */}
          <marker id="mg" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#86efac"/></marker>
          {/* Gray arrow (allocation) */}
          <marker id="md" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#d3d8e0"/></marker>
          {/* Amber dashed arrow (info flow) */}
          <marker id="mi" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#fbbf24"/></marker>
          <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#1a1f36" floodOpacity="0.06"/>
          </filter>
          <linearGradient id="zg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8f6ff" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#f0edff" stopOpacity="0.15"/>
          </linearGradient>
        </defs>

        {/* Zone */}
        <rect x="520" y="24" width="1060" height="500" rx="20" fill="url(#zg)" stroke="#e8e5f5" strokeWidth="1"/>
        <text className="zt" x="555" y="52">TBOOK YIELD INFRASTRUCTURE</text>

        {/* === DEPOSIT PATH === */}

        {/* Customer -> Platform : Deposit USDC */}
        <path d="M 155,150 L 370,150" fill="none" stroke="#c4b5fd" strokeWidth="2.2" markerEnd="url(#mp)"/>
        <text className="edge ep" x="210" y="136">Deposit USDC</text>

        {/* Platform -> Vault : USDC */}
        <path d="M 530,150 L 740,150" fill="none" stroke="#c4b5fd" strokeWidth="2.2" markerEnd="url(#mp)"/>
        <text className="edge ep" x="600" y="136">USDC</text>

        {/* Vault -> RWA : Allocation */}
        <path d="M 900,150 L 1090,150" fill="none" stroke="#d3d8e0" strokeWidth="2.2" markerEnd="url(#md)"/>
        <text className="edge" style={{fill:'#697386'}} x="950" y="136">Allocation</text>

        {/* Vault -> Platform : Shares Issued (green return arc) */}
        <path d="M 770,220 C 740,270 620,270 500,220" fill="none" stroke="#86efac" strokeWidth="2.2" markerEnd="url(#mg)"/>
        <text className="edge eg" x="580" y="268">Shares Issued</text>

        {/* === REDEEM PATH === */}

        {/* Customer -> Platform : Redeem */}
        <path d="M 155,440 L 370,440" fill="none" stroke="#c4b5fd" strokeWidth="2.2" markerEnd="url(#mp)"/>
        <text className="edge ep" x="215" y="426">Redeem</text>

        {/* Platform -> Vault : Shares */}
        <path d="M 530,440 L 740,440" fill="none" stroke="#c4b5fd" strokeWidth="2.2" markerEnd="url(#mp)"/>
        <text className="edge ep" x="600" y="426">Shares</text>

        {/* Vault -> RWA : Liquidate */}
        <path d="M 900,440 L 1090,390" fill="none" stroke="#d3d8e0" strokeWidth="1.6" markerEnd="url(#md)" strokeDasharray="6 4"/>
        <text className="edge" style={{fill:'#697386'}} x="950" y="426">Liquidate</text>

        {/* Vault -> Platform : USDC Returned (green return arc) */}
        <path d="M 770,370 C 740,320 620,320 500,370" fill="none" stroke="#86efac" strokeWidth="2.2" markerEnd="url(#mg)"/>
        <text className="edge eg" x="570" y="330">USDC Returned</text>

        {/* === NAV ORACLE INFO FLOW === */}

        {/* RWA -> NAV Oracle : Asset Valuation (dashed amber) */}
        <path d="M 1230,150 L 1380,150" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="7 5" markerEnd="url(#mi)"/>
        <text className="edge ei" x="1258" y="136">Asset Valuation</text>

        {/* NAV Oracle -> Platform : Share Price (dashed amber, curved) */}
        <path d="M 1420,220 C 1380,340 1000,510 500,490" fill="none" stroke="#fbbf24" strokeWidth="1.4" strokeDasharray="6 5" markerEnd="url(#mi)"/>
        <text className="edge ei" x="1050" y="490">Share Price (for UI display)</text>

        {/* === NODES === */}

        {/* Customer (Deposit) */}
        <g filter="url(#sh)">
          <circle cx="105" cy="150" r="46" fill="#fff" stroke="#e3e8ee" strokeWidth="1.5"/>
          <circle cx="105" cy="136" r="12" fill="none" stroke="#8792a2" strokeWidth="1.6"/>
          <path d="M 83,172 C 83,156 127,156 127,172" fill="none" stroke="#8792a2" strokeWidth="1.6"/>
        </g>
        <text className="nm" x="105" y="218" textAnchor="middle">Customer</text>

        {/* Customer (Redeem) */}
        <g filter="url(#sh)">
          <circle cx="105" cy="440" r="46" fill="#fff" stroke="#e3e8ee" strokeWidth="1.5"/>
          <circle cx="105" cy="426" r="12" fill="none" stroke="#8792a2" strokeWidth="1.6"/>
          <path d="M 83,462 C 83,446 127,446 127,462" fill="none" stroke="#8792a2" strokeWidth="1.6"/>
        </g>
        <text className="nm" x="105" y="508" textAnchor="middle">Customer</text>

        {/* Platform */}
        <g filter="url(#sh)">
          <circle cx="450" cy="290" r="60" fill="#fff" stroke="#e3e8ee" strokeWidth="1.5"/>
          <rect x="424" y="270" width="15" height="15" rx="3" fill="none" stroke="#697386" strokeWidth="1.4"/>
          <rect x="443" y="270" width="15" height="15" rx="3" fill="none" stroke="#697386" strokeWidth="1.4"/>
          <rect x="462" y="270" width="15" height="15" rx="3" fill="none" stroke="#697386" strokeWidth="1.4"/>
          <rect x="433" y="290" width="15" height="15" rx="3" fill="none" stroke="#697386" strokeWidth="1.4"/>
          <rect x="452" y="290" width="15" height="15" rx="3" fill="none" stroke="#697386" strokeWidth="1.4"/>
        </g>
        <text className="nm" x="450" y="374" textAnchor="middle">Platform</text>
        <text className="ns" x="450" y="394" textAnchor="middle">Your Application</text>

        {/* Dotted guides */}
        <path d="M 140,178 C 260,220 340,250 400,260" fill="none" stroke="#e3e8ee" strokeWidth="1.2" strokeDasharray="5 5"/>
        <path d="M 140,412 C 260,376 340,340 400,320" fill="none" stroke="#e3e8ee" strokeWidth="1.2" strokeDasharray="5 5"/>

        {/* TBook Vault */}
        <g filter="url(#sh)">
          <circle cx="830" cy="290" r="64" fill="#fff" stroke="#c4b5fd" strokeWidth="2"/>
          <path d="M 800,320 L 800,280 L 830,264 L 860,280 L 860,320" fill="none" stroke="#635bff" strokeWidth="2.2" strokeLinejoin="round"/>
          <line x1="800" y1="320" x2="860" y2="320" stroke="#635bff" strokeWidth="2.2"/>
          <line x1="800" y1="280" x2="860" y2="280" stroke="#635bff" strokeWidth="1.2" opacity="0.3"/>
          <line x1="812" y1="320" x2="812" y2="286" stroke="#635bff" strokeWidth="1.4"/>
          <line x1="830" y1="320" x2="830" y2="280" stroke="#635bff" strokeWidth="1.4"/>
          <line x1="848" y1="320" x2="848" y2="286" stroke="#635bff" strokeWidth="1.4"/>
        </g>
        <text className="nm" x="830" y="378" textAnchor="middle">TBook Vault</text>
        <text className="ns" x="830" y="398" textAnchor="middle">Settlement Engine</text>

        {/* Multisig badge */}
        <g>
          <rect x="755" y="418" width="158" height="32" rx="9" fill="#fff" stroke="#e3e8ee" strokeWidth="1"/>
          <rect x="772" y="428" width="11" height="8" rx="2" fill="none" stroke="#697386" strokeWidth="1.2"/>
          <path d="M 774,428 L 774,425 A 4,4 0 0 1 781,425 L 781,428" fill="none" stroke="#697386" strokeWidth="1.2"/>
          <text className="badge" x="789" y="439">2-of-3 Multisig</text>
        </g>
        <line x1="830" y1="400" x2="830" y2="418" stroke="#d3d8e0" strokeWidth="1" strokeDasharray="4 4"/>

        {/* === RWA SECTION === */}

        {/* US T-Bills */}
        <g filter="url(#sh)">
          <circle cx="1160" cy="170" r="56" fill="#fff" stroke="#86efac" strokeWidth="2"/>
          <path d="M 1130,200 L 1130,160 L 1160,144 L 1190,160 L 1190,200" fill="none" stroke="#0e9f6e" strokeWidth="2" strokeLinejoin="round"/>
          <line x1="1130" y1="200" x2="1190" y2="200" stroke="#0e9f6e" strokeWidth="2"/>
          <line x1="1130" y1="160" x2="1190" y2="160" stroke="#0e9f6e" strokeWidth="1" opacity="0.3"/>
          <line x1="1142" y1="200" x2="1142" y2="166" stroke="#0e9f6e" strokeWidth="1.3"/>
          <line x1="1160" y1="200" x2="1160" y2="160" stroke="#0e9f6e" strokeWidth="1.3"/>
          <line x1="1178" y1="200" x2="1178" y2="166" stroke="#0e9f6e" strokeWidth="1.3"/>
        </g>
        <text className="nm" x="1160" y="248" textAnchor="middle">US T-Bills</text>
        <text className="ns" x="1160" y="268" textAnchor="middle">Primary Strategy</text>

        {/* Also available card */}
        <rect x="1100" y="295" width="195" height="130" rx="12" fill="#fafdfb" stroke="#d1fae5" strokeWidth="1"/>
        <text className="ns" x="1122" y="320" fontStyle="italic" fill="#6b7280">Also available:</text>
        <circle cx="1122" cy="346" r="4.5" fill="#86efac"/>
        <text className="ns" x="1136" y="350">Private Credit</text>
        <circle cx="1122" cy="374" r="4.5" fill="#86efac"/>
        <text className="ns" x="1136" y="378">Gold</text>
        <circle cx="1122" cy="402" r="4.5" fill="#86efac"/>
        <text className="ns" x="1136" y="406">More RWA strategies</text>
        <line x1="1160" y1="270" x2="1160" y2="295" stroke="#d1fae5" strokeWidth="1" strokeDasharray="4 4"/>

        {/* NAV Oracle */}
        <g filter="url(#sh)">
          <circle cx="1460" cy="170" r="50" fill="#fff" stroke="#fde68a" strokeWidth="2"/>
          <polyline points="1436,192 1448,180 1460,186 1484,162" fill="none" stroke="#ca8a04" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="1474,162 1484,162 1484,172" fill="none" stroke="#ca8a04" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <text className="nm" x="1460" y="242" textAnchor="middle">NAV Oracle</text>
        <text className="ns" x="1460" y="262" textAnchor="middle">Share Pricing</text>

        {/* === LEGEND === */}
        <g transform="translate(1300, 440)">
          <rect x="0" y="0" width="230" height="76" rx="10" fill="#fff" stroke="#e3e8ee" strokeWidth="1"/>
          <line x1="16" y1="22" x2="48" y2="22" stroke="#c4b5fd" strokeWidth="2"/>
          <polygon points="44,19 50,22 44,25" fill="#c4b5fd"/>
          <text className="ns" x="58" y="26">Fund flow (USDC / Shares)</text>
          <line x1="16" y1="44" x2="48" y2="44" stroke="#86efac" strokeWidth="2"/>
          <polygon points="44,41 50,44 44,47" fill="#86efac"/>
          <text className="ns" x="58" y="48">Return flow</text>
          <line x1="16" y1="66" x2="48" y2="66" stroke="#fbbf24" strokeWidth="1.6" strokeDasharray="5 4"/>
          <polygon points="44,63 50,66 44,69" fill="#fbbf24"/>
          <text className="ns" x="58" y="70">Info flow (pricing data)</text>
        </g>

        {/* === HOW IT WORKS === */}
        <line x1="40" y1="560" x2="1560" y2="560" stroke="#e3e8ee" strokeWidth="1"/>
        <text className="sect" x="40" y="590">HOW IT WORKS</text>

        <circle cx="58" cy="624" r="13" fill="#f0f0ff"/>
        <text x="58" y="629" textAnchor="middle" fontSize="13" fontWeight="700" fill="#635bff">1</text>
        <text className="st" x="80" y="620">Customers deposit USDC</text>
        <text className="ss" x="80" y="638">via your platform's interface</text>

        <circle cx="370" cy="624" r="13" fill="#f0f0ff"/>
        <text x="370" y="629" textAnchor="middle" fontSize="13" fontWeight="700" fill="#635bff">2</text>
        <text className="st" x="392" y="620">Multisig approves</text>
        <text className="ss" x="392" y="638">batch settlement (2-of-3)</text>

        <circle cx="650" cy="624" r="13" fill="#f0f0ff"/>
        <text x="650" y="629" textAnchor="middle" fontSize="13" fontWeight="700" fill="#635bff">3</text>
        <text className="st" x="672" y="620">Allocated to RWA strategies</text>
        <text className="ss" x="672" y="638">{"T-Bills, private credit, gold & more"}</text>

        <circle cx="990" cy="624" r="13" fill="#ecfdf5"/>
        <text x="990" y="629" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e9f6e">4</text>
        <text className="st" x="1012" y="620">Yield accrues daily</text>
        <text className="ss" x="1012" y="638">NAV appreciates automatically</text>

        <circle cx="1280" cy="624" r="13" fill="#ecfdf5"/>
        <text x="1280" y="629" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e9f6e">5</text>
        <text className="st" x="1302" y="620">Redeem anytime</text>
        <text className="ss" x="1302" y="638">Batch settlement, USDC returned</text>

        {/* Badges */}
        <g transform="translate(40, 680)">
          <rect x="0" y="0" width="124" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="16" y="20">{"\uD83D\uDD12 Non-custodial"}</text>

          <rect x="138" y="0" width="140" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="154" y="20">{"\u23F1 Batch Settlement"}</text>

          <rect x="292" y="0" width="155" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="308" y="20">{"\uD83D\uDEE1 Multisig Protected"}</text>

          <rect x="461" y="0" width="160" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="477" y="20">{"\u2705 Third-party Audited"}</text>

          <rect x="635" y="0" width="170" height="30" rx="7" fill="#f7f8fa" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="badge" x="651" y="20">{"\uD83D\uDCC8 On-chain Verifiable"}</text>
        </g>
      </svg>
    </div>
  );
}
