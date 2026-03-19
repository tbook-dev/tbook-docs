import React from 'react';

export default function EpochLifecycleDiagram(): React.ReactElement {
  return (
    <div style={{ width: '100%', height: 'auto', overflowX: 'auto' }}>
      <svg className="diagram" viewBox="0 0 1400 980" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <style>{`
            .el-nm { font: 600 15px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #1a1f36; }
            .el-ns { font: 400 12px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; }
            .el-edge { font: 600 12px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; }
            .el-ep { fill: #635bff; }
            .el-er { fill: #ef4444; }
            .el-eg { fill: #0e9f6e; }
            .el-badge { font: 500 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #697386; }
            .el-zt { font: 700 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #635bff; letter-spacing: 0.8px; }
            .el-sect { font: 600 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; letter-spacing: 1.2px; }
            .el-stateLabel { font: 600 13px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #fff; }
            .el-userSees { font: 500 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #374151; }
            .el-platformDoes { font: 400 11px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #8792a2; }
            .el-whyTitle { font: 600 14px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #1a1f36; }
            .el-whyText { font: 400 13px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #4b5563; }
            .el-whyNum { font: 700 16px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; fill: #635bff; }
          `}</style>
          {/* Purple arrow */}
          <marker id="el-ap" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#c4b5fd"/></marker>
          {/* Red arrow (rollback) */}
          <marker id="el-ar" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#fca5a5"/></marker>
          {/* Green arrow (settled) */}
          <marker id="el-ag" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><polygon points="0,1 9,4.5 0,8" fill="#86efac"/></marker>
          <filter id="el-sh" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#1a1f36" floodOpacity="0.06"/>
          </filter>
          <linearGradient id="el-whyBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8f6ff" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#f0edff" stopOpacity="0.2"/>
          </linearGradient>
        </defs>

        {/* WHY EPOCHS EXIST */}
        <rect x="40" y="24" width="1320" height="160" rx="16" fill="url(#el-whyBg)" stroke="#e8e5f5" strokeWidth="1"/>
        <text className="el-sect" x="72" y="56">WHY EPOCHS EXIST</text>

        {/* Divider */}
        <line x1="700" y1="70" x2="700" y2="170" stroke="#e8e5f5" strokeWidth="1"/>

        {/* Reason 1 (left column) */}
        <text className="el-whyNum" x="72" y="92">1</text>
        <text className="el-whyTitle" x="92" y="92">RWA assets need time to settle</text>
        <text className="el-whyText" x="92" y="114">T-Bills settle T+1, private credit may take longer.</text>
        <text className="el-whyText" x="92" y="132">Epochs align on-chain operations with off-chain</text>
        <text className="el-whyText" x="92" y="150">asset settlement, ensuring funds are properly</text>
        <text className="el-whyText" x="92" y="168">invested before shares are issued.</text>

        {/* Reason 2 (right column) */}
        <text className="el-whyNum" x="726" y="92">2</text>
        <text className="el-whyTitle" x="746" y="92">Batch processing is efficient and secure</text>
        <text className="el-whyText" x="746" y="114">Aggregating requests into a single batch reduces</text>
        <text className="el-whyText" x="746" y="132">gas costs, enables more accurate NAV calculation,</text>
        <text className="el-whyText" x="746" y="150">and allows multisig signers to review all operations</text>
        <text className="el-whyText" x="746" y="168">in one pass for stronger security guarantees.</text>

        {/* === DEPOSIT EPOCH === */}
        <text className="el-zt" x="40" y="228">DEPOSIT EPOCH</text>

        {/* Open state */}
        <g filter="url(#el-sh)">
          <rect x="40" y="248" width="220" height="120" rx="12" fill="#fff" stroke="#e3e8ee" strokeWidth="1.5"/>
          <rect x="40" y="248" width="220" height="36" rx="12" fill="#635bff"/>
          <rect x="40" y="268" width="220" height="16" fill="#635bff"/>
          <text className="el-stateLabel" x="150" y="271" textAnchor="middle">Open</text>
        </g>
        <text className="el-userSees" x="56" y="306">{'User sees: "Deposit now" button'}</text>
        <text className="el-platformDoes" x="56" y="324">Platform: Accept deposit requests</text>
        <text className="el-platformDoes" x="56" y="340">via SDK or REST API</text>

        {/* Arrow: Open -> Frozen */}
        <path d="M 260,308 L 320,308" fill="none" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#el-ap)"/>
        <text className="el-edge el-ep" x="270" y="298">freeze()</text>

        {/* Frozen state */}
        <g filter="url(#el-sh)">
          <rect x="330" y="248" width="220" height="120" rx="12" fill="#fff" stroke="#fde68a" strokeWidth="1.5"/>
          <rect x="330" y="248" width="220" height="36" rx="12" fill="#ca8a04"/>
          <rect x="330" y="268" width="220" height="16" fill="#ca8a04"/>
          <text className="el-stateLabel" x="440" y="271" textAnchor="middle">Frozen</text>
        </g>
        <text className="el-userSees" x="346" y="306">{'User sees: "Processing batch..."'}</text>
        <text className="el-platformDoes" x="346" y="324">Platform: No new deposits accepted.</text>
        <text className="el-platformDoes" x="346" y="340">Prepare USDC transfer to vault.</text>

        {/* Arrow: Frozen -> Processing */}
        <path d="M 550,308 L 610,308" fill="none" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#el-ap)"/>
        <text className="el-edge el-ep" x="548" y="298">beginSettle()</text>

        {/* Processing state */}
        <g filter="url(#el-sh)">
          <rect x="620" y="248" width="220" height="120" rx="12" fill="#fff" stroke="#c4b5fd" strokeWidth="1.5"/>
          <rect x="620" y="248" width="220" height="36" rx="12" fill="#7c3aed"/>
          <rect x="620" y="268" width="220" height="16" fill="#7c3aed"/>
          <text className="el-stateLabel" x="730" y="271" textAnchor="middle">Processing</text>
        </g>
        <text className="el-userSees" x="636" y="306">{'User sees: "Processing deposit..."'}</text>
        <text className="el-platformDoes" x="636" y="324">Platform: USDC allocated to RWA.</text>
        <text className="el-platformDoes" x="636" y="340">Awaiting off-chain confirmation.</text>

        {/* Arrow: Processing -> Settled */}
        <path d="M 840,308 L 900,308" fill="none" stroke="#86efac" strokeWidth="2" markerEnd="url(#el-ag)"/>
        <text className="el-edge el-eg" x="838" y="298">settle()</text>

        {/* Settled state */}
        <g filter="url(#el-sh)">
          <rect x="910" y="248" width="240" height="120" rx="12" fill="#fff" stroke="#86efac" strokeWidth="1.5"/>
          <rect x="910" y="248" width="240" height="36" rx="12" fill="#0e9f6e"/>
          <rect x="910" y="268" width="240" height="16" fill="#0e9f6e"/>
          <text className="el-stateLabel" x="1030" y="271" textAnchor="middle">Settled</text>
        </g>
        <text className="el-userSees" x="926" y="306">{'User sees: "Your shares are ready!"'}</text>
        <text className="el-platformDoes" x="926" y="324">Platform: Shares minted and credited</text>
        <text className="el-platformDoes" x="926" y="340">to depositors. New epoch opens.</text>
        {/* Webhook badge */}
        <rect x="926" y="348" width="205" height="18" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="0.8"/>
        <text className="el-badge" x="934" y="361" fill="#0e9f6e">{"\u26A1 deposit_epoch.settled"}</text>

        {/* RolledBack state */}
        <g filter="url(#el-sh)">
          <rect x="430" y="430" width="240" height="120" rx="12" fill="#fff" stroke="#fca5a5" strokeWidth="1.5"/>
          <rect x="430" y="430" width="240" height="36" rx="12" fill="#ef4444"/>
          <rect x="430" y="450" width="240" height="16" fill="#ef4444"/>
          <text className="el-stateLabel" x="550" y="453" textAnchor="middle">RolledBack</text>
        </g>
        <text className="el-userSees" x="446" y="490">{'User sees: "Deposit returned"'}</text>
        <text className="el-platformDoes" x="446" y="508">Platform: USDC returned to depositors.</text>
        <text className="el-platformDoes" x="446" y="524">Epoch cancelled, no shares minted.</text>
        <rect x="446" y="532" width="215" height="18" rx="4" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.8"/>
        <text className="el-badge" x="454" y="545" fill="#ef4444">{"\u26A1 deposit_epoch.rolled_back"}</text>

        {/* Arrow: Frozen -> RolledBack */}
        <path d="M 440,368 L 440,390 C 440,410 480,425 520,430" fill="none" stroke="#fca5a5" strokeWidth="1.8" markerEnd="url(#el-ar)" strokeDasharray="6 4"/>
        <text className="el-edge el-er" x="410" y="405">rollback()</text>

        {/* Arrow: Processing -> RolledBack */}
        <path d="M 730,368 L 730,390 C 730,410 660,425 600,430" fill="none" stroke="#fca5a5" strokeWidth="1.8" markerEnd="url(#el-ar)" strokeDasharray="6 4"/>
        <text className="el-edge el-er" x="695" y="405">rollback()</text>

        {/* === REDEEM EPOCH === */}
        <text className="el-zt" x="40" y="620">REDEEM EPOCH</text>

        {/* Open state */}
        <g filter="url(#el-sh)">
          <rect x="40" y="640" width="220" height="120" rx="12" fill="#fff" stroke="#e3e8ee" strokeWidth="1.5"/>
          <rect x="40" y="640" width="220" height="36" rx="12" fill="#635bff"/>
          <rect x="40" y="660" width="220" height="16" fill="#635bff"/>
          <text className="el-stateLabel" x="150" y="663" textAnchor="middle">Open</text>
        </g>
        <text className="el-userSees" x="56" y="698">{'User sees: "Redeem" button'}</text>
        <text className="el-platformDoes" x="56" y="716">Platform: Accept redeem requests.</text>
        <text className="el-platformDoes" x="56" y="732">Shares are queued for burning.</text>

        {/* Arrow: Open -> Frozen */}
        <path d="M 260,700 L 410,700" fill="none" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#el-ap)"/>
        <text className="el-edge el-ep" x="300" y="690">freeze()</text>

        {/* Frozen state */}
        <g filter="url(#el-sh)">
          <rect x="420" y="640" width="220" height="120" rx="12" fill="#fff" stroke="#fde68a" strokeWidth="1.5"/>
          <rect x="420" y="640" width="220" height="36" rx="12" fill="#ca8a04"/>
          <rect x="420" y="660" width="220" height="16" fill="#ca8a04"/>
          <text className="el-stateLabel" x="530" y="663" textAnchor="middle">Frozen</text>
        </g>
        <text className="el-userSees" x="436" y="698">{'User sees: "Processing..."'}</text>
        <text className="el-platformDoes" x="436" y="716">Platform: No new redeems accepted.</text>
        <text className="el-platformDoes" x="436" y="732">Prepare USDC for distribution.</text>

        {/* Arrow: Frozen -> Settled */}
        <path d="M 640,700 L 790,700" fill="none" stroke="#86efac" strokeWidth="2" markerEnd="url(#el-ag)"/>
        <text className="el-edge el-eg" x="680" y="690">settle()</text>

        {/* Settled state */}
        <g filter="url(#el-sh)">
          <rect x="800" y="640" width="240" height="120" rx="12" fill="#fff" stroke="#86efac" strokeWidth="1.5"/>
          <rect x="800" y="640" width="240" height="36" rx="12" fill="#0e9f6e"/>
          <rect x="800" y="660" width="240" height="16" fill="#0e9f6e"/>
          <text className="el-stateLabel" x="920" y="663" textAnchor="middle">Settled</text>
        </g>
        <text className="el-userSees" x="816" y="698">{'User sees: "USDC ready to claim!"'}</text>
        <text className="el-platformDoes" x="816" y="716">Platform: USDC available. Customer</text>
        <text className="el-platformDoes" x="816" y="732">calls claim() to withdraw.</text>
        <rect x="816" y="740" width="205" height="18" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="0.8"/>
        <text className="el-badge" x="824" y="753" fill="#0e9f6e">{"\u26A1 redeem_epoch.settled"}</text>

        {/* Note: No Processing state */}
        <rect x="680" y="635" width="110" height="18" rx="4" fill="#f8f6ff" stroke="#e8e5f5" strokeWidth="0.8"/>
        <text className="el-badge" x="688" y="648" fill="#635bff">No Processing state</text>

        {/* RolledBack state */}
        <g filter="url(#el-sh)">
          <rect x="420" y="820" width="240" height="120" rx="12" fill="#fff" stroke="#fca5a5" strokeWidth="1.5"/>
          <rect x="420" y="820" width="240" height="36" rx="12" fill="#ef4444"/>
          <rect x="420" y="840" width="240" height="16" fill="#ef4444"/>
          <text className="el-stateLabel" x="540" y="843" textAnchor="middle">RolledBack</text>
        </g>
        <text className="el-userSees" x="436" y="880">{'User sees: "Redeem cancelled"'}</text>
        <text className="el-platformDoes" x="436" y="898">Platform: Shares returned to holders.</text>
        <text className="el-platformDoes" x="436" y="914">No USDC distributed.</text>
        <rect x="436" y="922" width="215" height="18" rx="4" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.8"/>
        <text className="el-badge" x="444" y="935" fill="#ef4444">{"\u26A1 redeem_epoch.rolled_back"}</text>

        {/* Arrow: Frozen -> RolledBack */}
        <path d="M 530,760 L 530,820" fill="none" stroke="#fca5a5" strokeWidth="1.8" markerEnd="url(#el-ar)" strokeDasharray="6 4"/>
        <text className="el-edge el-er" x="540" y="795">rollback()</text>

        {/* === LEGEND === */}
        <g transform="translate(1160, 640)">
          <rect x="0" y="0" width="200" height="120" rx="10" fill="#fff" stroke="#e3e8ee" strokeWidth="1"/>
          <text className="el-sect" x="16" y="24">LEGEND</text>
          <line x1="16" y1="46" x2="48" y2="46" stroke="#c4b5fd" strokeWidth="2"/>
          <polygon points="44,43 50,46 44,49" fill="#c4b5fd"/>
          <text className="el-ns" x="58" y="50">State transition</text>
          <line x1="16" y1="68" x2="48" y2="68" stroke="#86efac" strokeWidth="2"/>
          <polygon points="44,65 50,68 44,71" fill="#86efac"/>
          <text className="el-ns" x="58" y="72">Settlement (success)</text>
          <line x1="16" y1="90" x2="48" y2="90" stroke="#fca5a5" strokeWidth="1.8" strokeDasharray="5 4"/>
          <polygon points="44,87 50,90 44,93" fill="#fca5a5"/>
          <text className="el-ns" x="58" y="94">Rollback (cancellation)</text>
          <rect x="16" y="102" width="10" height="10" rx="2" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="0.8"/>
          <text className="el-ns" x="34" y="112">Webhook event</text>
        </g>

        {/* KEY DIFFERENCE NOTE */}
        <g transform="translate(1160, 440)">
          <rect x="0" y="0" width="200" height="140" rx="10" fill="#fff" stroke="#e8e5f5" strokeWidth="1"/>
          <text className="el-sect" x="16" y="24">KEY DIFFERENCE</text>
          <text className="el-whyText" x="16" y="48" fontSize="12">Deposit epochs have a</text>
          <text className="el-whyText" x="16" y="64" fontSize="12" fontWeight="600" fill="#7c3aed">Processing</text>
          <text className="el-whyText" x="85" y="64" fontSize="12"> state because</text>
          <text className="el-whyText" x="16" y="80" fontSize="12">USDC must be transferred</text>
          <text className="el-whyText" x="16" y="96" fontSize="12">to and invested in the</text>
          <text className="el-whyText" x="16" y="112" fontSize="12">RWA strategy before</text>
          <text className="el-whyText" x="16" y="128" fontSize="12">shares can be minted.</text>
        </g>
      </svg>
    </div>
  );
}
