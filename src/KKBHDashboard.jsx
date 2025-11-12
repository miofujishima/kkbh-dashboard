import React, { useState, useEffect } from 'react';
import { Settings, Save, Plus, Trash2, Edit2, X, Lock, Palette, Maximize2, Eye, GripVertical, Upload, Download, Undo, Redo, FolderPlus } from 'lucide-react';

const KKBHDashboard = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [editingButton, setEditingButton] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStyleEditor, setShowStyleEditor] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [draggedButton, setDraggedButton] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [editingSection, setEditingSection] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showSaveSuccessDialog, setShowSaveSuccessDialog] = useState(false);
  const [clickStats, setClickStats] = useState({});
  const [expandedMenu, setExpandedMenu] = useState(null);


  const ADMIN_PASSWORD = 'msmdashboard';

  const iconList = [
    // 主要国の国旗（100カ国以上）
    { name: '🇯🇵', label: '日本' },
    { name: '🇺🇸', label: 'アメリカ' },
    { name: '🇨🇳', label: '中国' },
    { name: '🇰🇷', label: '韓国' },
    { name: '🇹🇼', label: '台湾' },
    { name: '🇭🇰', label: '香港' },
    { name: '🇮🇳', label: 'インド' },
    { name: '🇮🇩', label: 'インドネシア' },
    { name: '🇹🇭', label: 'タイ' },
    { name: '🇻🇳', label: 'ベトナム' },
    { name: '🇵🇭', label: 'フィリピン' },
    { name: '🇲🇾', label: 'マレーシア' },
    { name: '🇸🇬', label: 'シンガポール' },
    { name: '🇧🇩', label: 'バングラデシュ' },
    { name: '🇵🇰', label: 'パキスタン' },
    { name: '🇱🇰', label: 'スリランカ' },
    { name: '🇲🇲', label: 'ミャンマー' },
    { name: '🇰🇭', label: 'カンボジア' },
    { name: '🇱🇦', label: 'ラオス' },
    { name: '🇧🇳', label: 'ブルネイ' },
    { name: '🇲🇳', label: 'モンゴル' },
    { name: '🇦🇺', label: 'オーストラリア' },
    { name: '🇳🇿', label: 'ニュージーランド' },
    { name: '🇬🇧', label: 'イギリス' },
    { name: '🇩🇪', label: 'ドイツ' },
    { name: '🇫🇷', label: 'フランス' },
    { name: '🇮🇹', label: 'イタリア' },
    { name: '🇪🇸', label: 'スペイン' },
    { name: '🇳🇱', label: 'オランダ' },
    { name: '🇧🇪', label: 'ベルギー' },
    { name: '🇨🇭', label: 'スイス' },
    { name: '🇦🇹', label: 'オーストリア' },
    { name: '🇸🇪', label: 'スウェーデン' },
    { name: '🇳🇴', label: 'ノルウェー' },
    { name: '🇩🇰', label: 'デンマーク' },
    { name: '🇫🇮', label: 'フィンランド' },
    { name: '🇵🇱', label: 'ポーランド' },
    { name: '🇨🇿', label: 'チェコ' },
    { name: '🇭🇺', label: 'ハンガリー' },
    { name: '🇷🇴', label: 'ルーマニア' },
    { name: '🇬🇷', label: 'ギリシャ' },
    { name: '🇵🇹', label: 'ポルトガル' },
    { name: '🇮🇪', label: 'アイルランド' },
    { name: '🇷🇺', label: 'ロシア' },
    { name: '🇺🇦', label: 'ウクライナ' },
    { name: '🇹🇷', label: 'トルコ' },
    { name: '🇸🇦', label: 'サウジアラビア' },
    { name: '🇦🇪', label: 'UAE' },
    { name: '🇮🇱', label: 'イスラエル' },
    { name: '🇪🇬', label: 'エジプト' },
    { name: '🇿🇦', label: '南アフリカ' },
    { name: '🇳🇬', label: 'ナイジェリア' },
    { name: '🇰🇪', label: 'ケニア' },
    { name: '🇪🇹', label: 'エチオピア' },
    { name: '🇬🇭', label: 'ガーナ' },
    { name: '🇲🇦', label: 'モロッコ' },
    { name: '🇹🇳', label: 'チュニジア' },
    { name: '🇨🇦', label: 'カナダ' },
    { name: '🇲🇽', label: 'メキシコ' },
    { name: '🇧🇷', label: 'ブラジル' },
    { name: '🇦🇷', label: 'アルゼンチン' },
    { name: '🇨🇱', label: 'チリ' },
    { name: '🇨🇴', label: 'コロンビア' },
    { name: '🇵🇪', label: 'ペルー' },
    { name: '🇻🇪', label: 'ベネズエラ' },
    { name: '🇪🇨', label: 'エクアドル' },
    { name: '🇧🇴', label: 'ボリビア' },
    { name: '🇵🇾', label: 'パラグアイ' },
    { name: '🇺🇾', label: 'ウルグアイ' },
    { name: '🇨🇷', label: 'コスタリカ' },
    { name: '🇵🇦', label: 'パナマ' },
    { name: '🇨🇺', label: 'キューバ' },
    { name: '🇯🇲', label: 'ジャマイカ' },
    { name: '🇹🇹', label: 'トリニダード・トバゴ' },
    { name: '🇧🇸', label: 'バハマ' },
    { name: '🇧🇧', label: 'バルバドス' },
    { name: '🇮🇸', label: 'アイスランド' },
    { name: '🇱🇺', label: 'ルクセンブルク' },
    { name: '🇲🇹', label: 'マルタ' },
    { name: '🇨🇾', label: 'キプロス' },
    { name: '🇪🇪', label: 'エストニア' },
    { name: '🇱🇻', label: 'ラトビア' },
    { name: '🇱🇹', label: 'リトアニア' },
    { name: '🇸🇰', label: 'スロバキア' },
    { name: '🇸🇮', label: 'スロベニア' },
    { name: '🇭🇷', label: 'クロアチア' },
    { name: '🇧🇬', label: 'ブルガリア' },
    { name: '🇷🇸', label: 'セルビア' },
    { name: '🇦🇱', label: 'アルバニア' },
    { name: '🇲🇰', label: '北マケドニア' },
    { name: '🇧🇦', label: 'ボスニア' },
    { name: '🇲🇪', label: 'モンテネグロ' },
    { name: '🇰🇿', label: 'カザフスタン' },
    { name: '🇺🇿', label: 'ウズベキスタン' },
    { name: '🇰🇬', label: 'キルギス' },
    { name: '🇹🇯', label: 'タジキスタン' },
    { name: '🇹🇲', label: 'トルクメニスタン' },
    { name: '🇦🇿', label: 'アゼルバイジャン' },
    { name: '🇦🇲', label: 'アルメニア' },
    { name: '🇬🇪', label: 'ジョージア' },
    { name: '🇮🇷', label: 'イラン' },
    { name: '🇮🇶', label: 'イラク' },
    { name: '🇯🇴', label: 'ヨルダン' },
    { name: '🇱🇧', label: 'レバノン' },
    { name: '🇸🇾', label: 'シリア' },
    { name: '🇾🇪', label: 'イエメン' },
    { name: '🇴🇲', label: 'オマーン' },
    { name: '🇰🇼', label: 'クウェート' },
    { name: '🇶🇦', label: 'カタール' },
    { name: '🇧🇭', label: 'バーレーン' },
    { name: '🇦🇫', label: 'アフガニスタン' },
    { name: '🇳🇵', label: 'ネパール' },
    { name: '🇧🇹', label: 'ブータン' },
    { name: '🇲🇻', label: 'モルディブ' },
    { name: '🇱🇾', label: 'リビア' },
    { name: '🇩🇿', label: 'アルジェリア' },
    { name: '🇸🇩', label: 'スーダン' },
    { name: '🇸🇸', label: '南スーダン' },
    { name: '🇺🇬', label: 'ウガンダ' },
    { name: '🇹🇿', label: 'タンザニア' },
    { name: '🇷🇼', label: 'ルワンダ' },
    { name: '🇧🇮', label: 'ブルンジ' },
    { name: '🇿🇲', label: 'ザンビア' },
    { name: '🇿🇼', label: 'ジンバブエ' },
    { name: '🇧🇼', label: 'ボツワナ' },
    { name: '🇳🇦', label: 'ナミビア' },
    { name: '🇦🇴', label: 'アンゴラ' },
    { name: '🇲🇿', label: 'モザンビーク' },
    { name: '🇲🇬', label: 'マダガスカル' },
    { name: '🇲🇺', label: 'モーリシャス' },
    { name: '🇸🇨', label: 'セーシェル' },
    { name: '🇨🇲', label: 'カメルーン' },
    { name: '🇨🇮', label: 'コートジボワール' },
    { name: '🇸🇳', label: 'セネガル' },
    { name: '🇲🇱', label: 'マリ' },
    { name: '🇳🇪', label: 'ニジェール' },
    { name: '🇧🇫', label: 'ブルキナファソ' },
    { name: '🇹🇬', label: 'トーゴ' },
    { name: '🇧🇯', label: 'ベナン' },
    { name: '🇬🇦', label: 'ガボン' },
    { name: '🇨🇩', label: 'コンゴ民主共和国' },
    { name: '🇨🇬', label: 'コンゴ共和国' },
    { name: '🇨🇫', label: '中央アフリカ' },
    { name: '🇹🇩', label: 'チャド' },
    { name: '🇸🇴', label: 'ソマリア' },
    { name: '🇩🇯', label: 'ジブチ' },
    { name: '🇪🇷', label: 'エリトリア' },
    { name: '🇲🇼', label: 'マラウイ' },
    { name: '🇱🇸', label: 'レソト' },
    { name: '🇸🇿', label: 'エスワティニ' },
    { name: '🇬🇶', label: '赤道ギニア' },
    { name: '🇬🇼', label: 'ギニアビサウ' },
    { name: '🇬🇳', label: 'ギニア' },
    { name: '🇸🇱', label: 'シエラレオネ' },
    { name: '🇱🇷', label: 'リベリア' },
    { name: '🇲🇷', label: 'モーリタニア' },
    { name: '🇬🇲', label: 'ガンビア' },
    { name: '🇨🇻', label: 'カーボベルデ' },
    { name: '🇸🇹', label: 'サントメ・プリンシペ' },
    { name: '🇰🇲', label: 'コモロ' },
    { name: '🇬🇹', label: 'グアテマラ' },
    { name: '🇭🇳', label: 'ホンジュラス' },
    { name: '🇸🇻', label: 'エルサルバドル' },
    { name: '🇳🇮', label: 'ニカラグア' },
    { name: '🇧🇿', label: 'ベリーズ' },
    { name: '🇩🇴', label: 'ドミニカ共和国' },
    { name: '🇭🇹', label: 'ハイチ' },
    { name: '🇵🇷', label: 'プエルトリコ' },
    { name: '🇬🇾', label: 'ガイアナ' },
    { name: '🇸🇷', label: 'スリナム' },
    { name: '🇫🇯', label: 'フィジー' },
    { name: '🇵🇬', label: 'パプアニューギニア' },
    { name: '🇼🇸', label: 'サモア' },
    { name: '🇹🇴', label: 'トンガ' },
    { name: '🇻🇺', label: 'バヌアツ' },
    { name: '🇸🇧', label: 'ソロモン諸島' },
    { name: '🇰🇮', label: 'キリバス' },
    { name: '🇲🇭', label: 'マーシャル諸島' },
    { name: '🇫🇲', label: 'ミクロネシア' },
    { name: '🇵🇼', label: 'パラオ' },
    { name: '🇳🇷', label: 'ナウル' },
    { name: '🇹🇻', label: 'ツバル' },
    { name: '🇧🇾', label: 'ベラルーシ' },
    { name: '🇲🇩', label: 'モルドバ' },
    { name: '🇽🇰', label: 'コソボ' },
    { name: '🇲🇨', label: 'モナコ' },
    { name: '🇱🇮', label: 'リヒテンシュタイン' },
    { name: '🇸🇲', label: 'サンマリノ' },
    { name: '🇻🇦', label: 'バチカン' },
    { name: '🇦🇩', label: 'アンドラ' },
    
    // 漢字一文字アイコン（国・地域）
    { name: '日', label: '日本（漢字）' },
    { name: '中', label: '中国（漢字）' },
    { name: '台', label: '台湾（漢字）' },
    { name: '亜', label: 'アジア（漢字）' },
    { name: '印', label: 'インド（漢字）' },
    { name: '越', label: 'ベトナム（漢字）' },
    { name: '馬', label: 'マレーシア（漢字）' },
    { name: '泰', label: 'タイ（漢字）' },
    { name: '尼', label: 'インドネシア（漢字）' },
    { name: '新', label: 'シンガポール（漢字）' },
    { name: '韓', label: '韓国（漢字）' },
    { name: '欧', label: '欧州（漢字）' },
    { name: '米', label: '米州・アメリカ（漢字）' },
    { name: '墨', label: 'メキシコ（漢字）' },
    
    // ビジネスアイコン
    { name: '🌐', label: 'グローバル' },
    { name: '📊', label: 'データ' },
    { name: '📈', label: '成長' },
    { name: '📉', label: '下降' },
    { name: '💰', label: '売上' },
    { name: '💵', label: 'ドル' },
    { name: '💴', label: '円' },
    { name: '💶', label: 'ユーロ' },
    { name: '💷', label: 'ポンド' },
    { name: '👥', label: '顧客' },
    { name: '🏭', label: '工場' },
    { name: '🔧', label: '製造' },
    { name: '⚙️', label: '設定' },
    { name: '📦', label: '在庫' },
    { name: '🚚', label: '配送' },
    { name: '📋', label: 'レポート' },
    { name: '🎯', label: '目標' },
    { name: '⚡', label: 'リアルタイム' },
    { name: '📅', label: '日次' },
    { name: '📆', label: '週次' },
    { name: '🗓️', label: '月次' },
    { name: '🔍', label: '分析' },
    { name: '💡', label: 'KPI' },
    { name: '🌟', label: '品質' },
    { name: '⚠️', label: '警告' },
    { name: '✅', label: '完了' },
    { name: '❌', label: 'エラー' },
    { name: '🏆', label: '成功' },
    { name: '🎨', label: 'デザイン' },
    { name: '🚀', label: 'ローンチ' },
    { name: '🌍', label: '世界' },
  ];

  const colorPalettes = [
    { name: 'Ocean Blue', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pattern: 'none', preview: '#667eea' },
    { name: 'Ocean Blue ドット', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pattern: 'dots', preview: '#667eea' },
    { name: 'Ocean Blue 斜線', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pattern: 'diagonal', preview: '#667eea' },
    { name: 'Ocean Blue 縦線', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pattern: 'vertical', preview: '#667eea' },
    { name: 'Ocean Blue 横線', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pattern: 'horizontal', preview: '#667eea' },
    { name: 'Ocean Blue 格子', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pattern: 'grid', preview: '#667eea' },
    
    { name: 'Sunset Orange', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', pattern: 'none', preview: '#f093fb' },
    { name: 'Sunset Orange ドット', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', pattern: 'dots', preview: '#f093fb' },
    { name: 'Sunset Orange 斜線', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', pattern: 'diagonal', preview: '#f093fb' },
    { name: 'Sunset Orange 縦線', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', pattern: 'vertical', preview: '#f093fb' },
    { name: 'Sunset Orange 横線', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', pattern: 'horizontal', preview: '#f093fb' },
    { name: 'Sunset Orange 格子', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', pattern: 'grid', preview: '#f093fb' },
    
    { name: 'Mint Green', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', pattern: 'none', preview: '#4facfe' },
    { name: 'Mint Green ドット', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', pattern: 'dots', preview: '#4facfe' },
    { name: 'Mint Green 斜線', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', pattern: 'diagonal', preview: '#4facfe' },
    { name: 'Mint Green 縦線', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', pattern: 'vertical', preview: '#4facfe' },
    { name: 'Mint Green 横線', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', pattern: 'horizontal', preview: '#4facfe' },
    { name: 'Mint Green 格子', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', pattern: 'grid', preview: '#4fracfe' },
    
    { name: 'Royal Blue', value: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', pattern: 'none', preview: '#3b82f6' },
    { name: 'Royal Blue ドット', value: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', pattern: 'dots', preview: '#3b82f6' },
    { name: 'Royal Blue 斜線', value: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', pattern: 'diagonal', preview: '#3b82f6' },
    { name: 'Royal Blue 縦線', value: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', pattern: 'vertical', preview: '#3b82f6' },
    { name: 'Royal Blue 横線', value: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', pattern: 'horizontal', preview: '#3b82f6' },
    { name: 'Royal Blue 格子', value: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', pattern: 'grid', preview: '#3b82f6' },
    
    { name: 'Emerald', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', pattern: 'none', preview: '#10b981' },
    { name: 'Emerald ドット', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', pattern: 'dots', preview: '#10b981' },
    { name: 'Emerald 斜線', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', pattern: 'diagonal', preview: '#10b981' },
    { name: 'Emerald 縦線', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', pattern: 'vertical', preview: '#10b981' },
    { name: 'Emerald 横線', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', pattern: 'horizontal', preview: '#10b981' },
    { name: 'Emerald 格子', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', pattern: 'grid', preview: '#10b981' },
    
    { name: 'Ruby Red', value: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', pattern: 'none', preview: '#ef4444' },
    { name: 'Ruby Red ドット', value: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', pattern: 'dots', preview: '#ef4444' },
    { name: 'Ruby Red 斜線', value: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', pattern: 'diagonal', preview: '#ef4444' },
    { name: 'Ruby Red 縦線', value: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', pattern: 'vertical', preview: '#ef4444' },
    { name: 'Ruby Red 横線', value: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', pattern: 'horizontal', preview: '#ef4444' },
    { name: 'Ruby Red 格子', value: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', pattern: 'grid', preview: '#ef4444' },
    
    { name: 'Amber', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', pattern: 'none', preview: '#f59e0b' },
    { name: 'Amber ドット', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', pattern: 'dots', preview: '#f59e0b' },
    { name: 'Amber 斜線', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', pattern: 'diagonal', preview: '#f59e0b' },
    { name: 'Amber 縦線', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', pattern: 'vertical', preview: '#f59e0b' },
    { name: 'Amber 横線', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', pattern: 'horizontal', preview: '#f59e0b' },
    { name: 'Amber 格子', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', pattern: 'grid', preview: '#f59e0b' },
    
    { name: 'Purple', value: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', pattern: 'none', preview: '#8b5cf6' },
    { name: 'Purple ドット', value: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', pattern: 'dots', preview: '#8b5cf6' },
    { name: 'Purple 斜線', value: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', pattern: 'diagonal', preview: '#8b5cf6' },
    { name: 'Purple 縦線', value: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', pattern: 'vertical', preview: '#8b5cf6' },
    { name: 'Purple 横線', value: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', pattern: 'horizontal', preview: '#8b5cf6' },
    { name: 'Purple 格子', value: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', pattern: 'grid', preview: '#8b5cf6' },
  ];

  const backgroundPatterns = [
    { 
      name: 'ダークブルー', 
      value: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      preview: '#0f172a'
    },
    { 
      name: 'ミッドナイト', 
      value: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1e293b 100%)',
      preview: '#1e3a8a'
    },
    { 
      name: 'ディープパープル', 
      value: 'linear-gradient(135deg, #581c87 0%, #3b0764 50%, #1e1b4b 100%)',
      preview: '#581c87'
    },
    { 
      name: 'フォレストグリーン', 
      value: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #134e4a 100%)',
      preview: '#064e3b'
    },
    { 
      name: 'チャコールグレー', 
      value: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #030712 100%)',
      preview: '#1f2937'
    },
    { 
      name: 'ナイトスカイ', 
      value: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #be185d 100%)',
      preview: '#1e40af'
    },
  ];

  const initialData = {
    title: "KKBH_Global経営ダッシュボード",
    backgroundColor: "linear-gradient(135deg, #1f2937 0%, #111827 50%, #030712 100%)",
    sections: [
      {
        id: "realtime",
        label: "リアルタイム",
        subtitle: "(受注モニタ)",
        buttons: [
          {
            id: "rt-global",
            label: "グローバル",
            icon: "🌐",
            link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=62d36826-dde7-47fb-b17e-bca43c7f7196",
            color: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
            pattern: "none"
          },
          {
            id: "rt-japan",
            label: "日本",
            icon: "日",
            link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=2e390a4e-1980-4a79-9de7-33d8223f285b",
            color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            pattern: "none"
          },
          {
            id: "rt-china",
            label: "中国",
            icon: "中",
            link: "",
            color: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
            children: [
              {
                id: "rt-china-child-1762771728713",
                label: "中国",
                icon: "中",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=0dfb85f1-5040-4a9c-ba08-8b8acceca803"
              },
              {
                id: "rt-china-child-1762771757704",
                label: "台湾",
                icon: "台",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=843b4bfb-2ae6-430a-90a1-04bbadae9a23"
              }
            ]
          },
          {
            id: "rt-asia",
            label: "アジア",
            icon: "亜",
            link: "",
            color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            children: [
              {
                id: "asia-india",
                label: "インド",
                icon: "印",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=88824398-f5f3-435a-a61c-e3ab3fa0cc48"
              },
              {
                id: "asia-vietnam",
                label: "ベトナム",
                icon: "越",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=1bd565b9-c72b-41b5-9865-986a474f1bac"
              },
              {
                id: "asia-malaysia",
                label: "マレーシア",
                icon: "馬",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=d9ca15c9-06d8-4daa-8260-7b1d04cb7510"
              },
              {
                id: "asia-thailand",
                label: "タイ",
                icon: "泰",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=8bdee28a-2e85-496a-baa4-9b4426908624"
              },
              {
                id: "asia-indonesia",
                label: "インドネシア",
                icon: "尼",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=58fe03bf-43dc-444e-951e-9a3bec1d7e8d"
              },
              {
                id: "asia-singapore",
                label: "シンガポール",
                icon: "新",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=1008f624-ca6f-4cd3-9c1b-f5e2f965d381"
              },
              {
                id: "asia-korea",
                label: "韓国",
                icon: "韓",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=bf0fc950-e9ff-43cf-8da1-5a29352b9e83"
              }
            ]
          },
          {
            id: "rt-europe",
            label: "欧州",
            icon: "欧",
            link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=10f18cda-3191-4c30-8780-491c39189362",
            color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            pattern: "none"
          },
          {
            id: "rt-america",
            label: "米州",
            icon: "米",
            link: "",
            color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            children: [
              {
                id: "rt-america-child-1762771954818",
                label: "アメリカ",
                icon: "米",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=42fdf4b7-bfc1-45a6-b225-0258aadc10e6"
              },
              {
                id: "rt-america-child-1762771957858",
                label: "メキシコ",
                icon: "墨",
                link: "https://app.powerbi.com/links/lrESHXlfVP?ctid=b3af1006-3cc7-43fe-8536-8d9196748a64&pbi_source=linkShare&bookmarkGuid=cf9fc32c-a77c-4c80-9fea-c5a14447645b"
              }
            ]
          }
        ]
      },
      {
        id: "daily",
        label: "日次",
        subtitle: "(進捗モニタ)",
        buttons: [
          {
            id: "daily-global",
            label: "グローバル",
            icon: "🌐",
            link: "",
            color: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
          },
          {
            id: "daily-japan",
            label: "日本",
            icon: "日",
            link: "",
            color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)"
          },
          {
            id: "daily-china",
            label: "中国",
            icon: "中",
            link: "",
            color: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
          },
          {
            id: "daily-asia",
            label: "アジア",
            icon: "亜",
            link: "",
            color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            children: [
              {
                id: "asia-india-d",
                label: "印度",
                icon: "印",
                link: ""
              },
              {
                id: "asia-vietnam-d",
                label: "越南",
                icon: "越",
                link: ""
              },
              {
                id: "asia-malaysia-d",
                label: "馬",
                icon: "馬",
                link: ""
              },
              {
                id: "asia-thailand-d",
                label: "タイ",
                icon: "泰",
                link: ""
              },
              {
                id: "asia-indonesia-d",
                label: "尼",
                icon: "尼",
                link: ""
              },
              {
                id: "asia-singapore-d",
                label: "新",
                icon: "新",
                link: ""
              },
              {
                id: "asia-korea-d",
                label: "韓国",
                icon: "韓",
                link: ""
              }
            ]
          },
          {
            id: "daily-europe",
            label: "欧州",
            icon: "欧",
            link: "",
            color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
          },
          {
            id: "daily-america",
            label: "米州",
            icon: "米",
            link: "",
            color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
          }
        ]
      },
      {
        id: "weekly",
        label: "週次",
        subtitle: "",
        buttons: [
          {
            id: "weekly-customer",
            label: "顧客離反モニタ",
            icon: "👥",
            link: "",
            color: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
          },
          {
            id: "weekly-eproduct",
            label: "E品モニタ",
            icon: "📦",
            link: "",
            color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)"
          },
          {
            id: "weekly-tbd1",
            label: "TBD",
            icon: "📋",
            link: "",
            color: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
          },
          {
            id: "weekly-tbd2",
            label: "TBD",
            icon: "📋",
            link: "",
            color: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
          },
          {
            id: "weekly-tbd3",
            label: "TBD",
            icon: "📋",
            link: "",
            color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
          },
          {
            id: "weekly-tbd4",
            label: "TBD",
            icon: "📋",
            link: "",
            color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
          }
        ]
      },
      {
        id: "monthly",
        label: "月次",
        subtitle: "",
        buttons: [
          {
            id: "monthly-global",
            label: "グローバル",
            icon: "🌐",
            link: "",
            color: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
          },
          {
            id: "monthly-business",
            label: "事業別",
            icon: "🏭",
            link: "",
            color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            children: [
              {
                id: "biz-press",
                label: "プレス",
                icon: "🔧",
                link: ""
              },
              {
                id: "biz-mold",
                label: "モールド",
                icon: "⚙️",
                link: ""
              },
              {
                id: "biz-special",
                label: "特注",
                icon: "⚡",
                link: ""
              },
              {
                id: "biz-service",
                label: "他サービス",
                icon: "📦",
                link: ""
              }
            ]
          },
          {
            id: "monthly-country",
            label: "国別",
            icon: "🌍",
            link: "",
            color: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
            children: [
              {
                id: "country-japan",
                label: "日本",
                icon: "日",
                link: ""
              },
              {
                id: "country-china",
                label: "中国",
                icon: "中",
                link: ""
              },
              {
                id: "country-india",
                label: "インド",
                icon: "印",
                link: ""
              },
              {
                id: "country-usa",
                label: "米国",
                icon: "米",
                link: ""
              },
              {
                id: "country-eu",
                label: "欧",
                icon: "欧",
                link: ""
              },
              {
                id: "country-taiwan",
                label: "台湾",
                icon: "台",
                link: ""
              },
              {
                id: "country-vietnam",
                label: "越南",
                icon: "越",
                link: ""
              },
              {
                id: "country-malaysia",
                label: "馬",
                icon: "馬",
                link: ""
              },
              {
                id: "country-thailand",
                label: "タイ",
                icon: "泰",
                link: ""
              },
              {
                id: "country-indonesia",
                label: "尼",
                icon: "尼",
                link: ""
              },
              {
                id: "country-singapore",
                label: "新",
                icon: "新",
                link: ""
              },
              {
                id: "country-korea",
                label: "韓国",
                icon: "韓",
                link: ""
              }
            ]
          },
          {
            id: "monthly-tbd1",
            label: "顧客別",
            icon: "👥",
            link: "",
            color: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
          },
          {
            id: "monthly-tbd2",
            label: "商品別",
            icon: "📦",
            link: "",
            color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
          },
          {
            id: "monthly-tbd3",
            label: "TBD",
            icon: "📋",
            link: "",
            color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
          }
        ]
      },
      {
        id: "kpi",
        label: "KPI",
        subtitle: "",
        buttons: [
          {
            id: "kpi-basic",
            label: "基礎KPI",
            icon: "💡",
            link: "",
            color: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
            children: [
              {
                id: "basic-press",
                label: "プレス",
                icon: "🔧",
                link: ""
              },
              {
                id: "basic-mold",
                label: "モールド",
                icon: "⚙️",
                link: ""
              },
              {
                id: "basic-price",
                label: "顧客単価",
                icon: "💰",
                link: ""
              },
              {
                id: "basic-discount",
                label: "値引率",
                icon: "📊",
                link: ""
              }
            ]
          },
          {
            id: "kpi-reliability",
            label: "信頼度KPI",
            icon: "🌟",
            link: "",
            color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            children: [
              {
                id: "rel-claim",
                label: "クレーム発生率",
                icon: "⚠️",
                link: ""
              },
              {
                id: "rel-delay",
                label: "納期遅れ率",
                icon: "📅",
                link: ""
              },
              {
                id: "rel-lp1",
                label: "送信LP率大口",
                icon: "📈",
                link: ""
              },
              {
                id: "rel-lp2",
                label: "送信LP率納短",
                icon: "📉",
                link: ""
              },
              {
                id: "rel-stock",
                label: "在庫切れ率",
                icon: "📦",
                link: ""
              },
              {
                id: "rel-ds",
                label: "DS額推移",
                icon: "💰",
                link: ""
              },
              {
                id: "rel-inventory",
                label: "在庫金額推移",
                icon: "📊",
                link: ""
              }
            ]
          },
          {
            id: "kpi-macro",
            label: "マクロ指標",
            icon: "🔍",
            link: "",
            color: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
            children: [
              {
                id: "macro-pmi",
                label: "国別PMI",
                icon: "📈",
                link: ""
              },
              {
                id: "macro-auto",
                label: "国別自動車生産台数",
                icon: "🚗",
                link: ""
              },
              {
                id: "macro-market",
                label: "国別金型市場規模",
                icon: "🏭",
                link: ""
              },
              {
                id: "macro-compete",
                label: "競合比較",
                icon: "🎯",
                link: ""
              }
            ]
          }
        ]
      },
      {
        id: "manufacturing",
        label: "製造",
        subtitle: "",
        buttons: [
          {
            id: "mfg-tdb1",
            label: "TBD",
            icon: "🏭",
            link: "",
            color: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
            pattern: "none"
          },
          {
            id: "mfg-tdb2",
            label: "TBD",
            icon: "🏭",
            link: "",
            color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            pattern: "none"
          },
          {
            id: "mfg-tdb3",
            label: "TBD",
            icon: "🏭",
            link: "",
            color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            pattern: "none"
          }
        ]
      }
    ]
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedData = localStorage.getItem('kkbh-dashboard-data');
      if (savedData) {
        const data = JSON.parse(savedData);
        setDashboardData(data);
        addToHistory(data);
      } else {
        setDashboardData(initialData);
        addToHistory(initialData);
      }
      
      // クリック統計を読み込む
      const savedStats = localStorage.getItem('kkbh-dashboard-click-stats');
      if (savedStats) {
        setClickStats(JSON.parse(savedStats));
      }
    } catch (error) {
      setDashboardData(initialData);
      addToHistory(initialData);
    }
    setLoading(false);
  };

  const addToHistory = (data) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(data)));
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDashboardData(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDashboardData(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  const saveData = async () => {
    try {
      localStorage.setItem('kkbh-dashboard-data', JSON.stringify(dashboardData));
      setShowSaveSuccessDialog(true);
    } catch (error) {
      alert('✗ 保存に失敗しました');
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(dashboardData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kkbh-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        setDashboardData(imported);
        addToHistory(imported);
        alert('✓ インポートしました');
      } catch (error) {
        alert('✗ ファイルの読み込みに失敗しました');
      }
    };
    reader.readAsText(file);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setShowPasswordDialog(false);
      setPasswordInput('');
    } else {
      alert('パスワードが正しくありません');
      setPasswordInput('');
    }
  };

  const handleButtonClick = (link, buttonId) => {
    if (link && !isAdminMode && !isPreviewMode) {
      // クリック統計を記録
      const newStats = { ...clickStats };
      if (!newStats[buttonId]) {
        newStats[buttonId] = {
          count: 0,
          lastClicked: null,
          firstClicked: new Date().toISOString()
        };
      }
      newStats[buttonId].count += 1;
      newStats[buttonId].lastClicked = new Date().toISOString();
      setClickStats(newStats);
      localStorage.setItem('kkbh-dashboard-click-stats', JSON.stringify(newStats));
      
      // 新しいタブでリンクを開く
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleToggleSubmenu = (buttonId, event) => {
    event.stopPropagation(); // 親ボタンのクリックを防ぐ
    if (expandedMenu === buttonId) {
      // 既に開いている場合は閉じる
      setExpandedMenu(null);
      setSubmenuPosition(null);
    } else {
      // 開く
      const rect = event.currentTarget.closest('button').getBoundingClientRect();
      setExpandedMenu(buttonId);
      setSubmenuPosition({
        left: rect.left,
        top: rect.bottom + 8,
        buttonId: buttonId
      });
    }
  };

  const openEditDialog = (sectionId, button, isChild = false, parentId = null, childIndex = null) => {
    setEditingButton({ sectionId, button, isChild, parentId, childIndex });
    setEditForm({
      label: button.label,
      link: button.link || '',
      color: button.color || 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      pattern: button.pattern || 'none',
      icon: button.icon || ''
    });
  };

  const saveButtonEdit = () => {
    const newData = JSON.parse(JSON.stringify(dashboardData));
    const section = newData.sections.find(s => s.id === editingButton.sectionId);
    
    if (editingButton.isChild) {
      const parentButton = section.buttons.find(b => b.id === editingButton.parentId);
      const child = parentButton.children[editingButton.childIndex];
      child.label = editForm.label;
      child.link = editForm.link;
      child.icon = editForm.icon;
    } else {
      const button = section.buttons.find(b => b.id === editingButton.button.id);
      button.label = editForm.label;
      button.link = editForm.link;
      button.color = editForm.color;
      button.pattern = editForm.pattern;
      button.icon = editForm.icon;
    }
    
    setDashboardData(newData);
    addToHistory(newData);
    setEditingButton(null);
    setEditForm(null);
  };

  const addChildButton = (sectionId, buttonId) => {
    const newData = JSON.parse(JSON.stringify(dashboardData));
    const section = newData.sections.find(s => s.id === sectionId);
    const button = section.buttons.find(b => b.id === buttonId);
    
    if (!button.children) {
      button.children = [];
    }
    
    const newChild = {
      id: `${buttonId}-child-${Date.now()}`,
      label: '新規項目',
      icon: '📋',
      link: ''
    };
    
    button.children.push(newChild);
    setDashboardData(newData);
    addToHistory(newData);
  };

  const deleteChildButton = (sectionId, buttonId, childIndex) => {
    if (!confirm('この子ボタンを削除しますか？')) return;
    
    const newData = JSON.parse(JSON.stringify(dashboardData));
    const section = newData.sections.find(s => s.id === sectionId);
    const button = section.buttons.find(b => b.id === buttonId);
    button.children.splice(childIndex, 1);
    
    if (button.children.length === 0) {
      delete button.children;
    }
    
    setDashboardData(newData);
    addToHistory(newData);
  };

  const getPatternStyle = (pattern) => {
    const patterns = {
      'none': '',
      'dots': `radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)`,
      'diagonal': `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)`,
      'vertical': `repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)`,
      'horizontal': `repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)`,
      'grid': `repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 12px), repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 12px)`
    };
    return patterns[pattern] || '';
  };

  const getButtonBackground = (color, pattern, hasLink, hasChildren) => {
    // 子メニューにリンクがあるかチェック（子メニューがある場合）
    const hasChildrenWithLinks = hasChildren && hasChildren.some(child => child.link && child.link.trim() !== '');
    
    // 自分のリンクも子メニューのリンクもない場合のみグレーに
    if (!hasLink && !hasChildrenWithLinks) {
      const greyColor = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
      const patternStyle = getPatternStyle(pattern);
      if (pattern === 'none' || !pattern) {
        return greyColor;
      }
      if (pattern === 'dots') {
        return `${patternStyle}, ${greyColor}`;
      }
      return `${patternStyle}, ${greyColor}`;
    }
    
    // リンクがある、または子メニューにリンクがある場合は通常の色
    const patternStyle = getPatternStyle(pattern);
    if (pattern === 'none' || !pattern) {
      return color;
    }
    if (pattern === 'dots') {
      return `${patternStyle}, ${color}`;
    }
    return `${patternStyle}, ${color}`;
  };

  const addSection = () => {
    const newData = JSON.parse(JSON.stringify(dashboardData));
    const newSection = {
      id: `section-${Date.now()}`,
      label: '新規セクション',
      subtitle: '',
      buttons: []
    };
    newData.sections.push(newSection);
    setDashboardData(newData);
    addToHistory(newData);
  };

  const editSection = (section) => {
    setEditingSection(section);
  };

  const saveSectionEdit = () => {
    const newData = JSON.parse(JSON.stringify(dashboardData));
    const section = newData.sections.find(s => s.id === editingSection.id);
    section.label = editingSection.label;
    section.subtitle = editingSection.subtitle;
    setDashboardData(newData);
    addToHistory(newData);
    setEditingSection(null);
  };

  const deleteSection = (sectionId) => {
    if (!confirm('このセクションを削除しますか？')) return;
    const newData = JSON.parse(JSON.stringify(dashboardData));
    newData.sections = newData.sections.filter(s => s.id !== sectionId);
    setDashboardData(newData);
    addToHistory(newData);
  };

  const addButtonToSection = (sectionId) => {
    const newData = JSON.parse(JSON.stringify(dashboardData));
    const section = newData.sections.find(s => s.id === sectionId);
    const newButton = {
      id: `button-${Date.now()}`,
      label: '新規ボタン',
      icon: '📊',
      link: '',
      color: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      pattern: 'none',
      children: []
    };
    section.buttons.push(newButton);
    setDashboardData(newData);
    addToHistory(newData);
  };

  const handleDragStart = (e, sectionId, buttonIndex) => {
    setDraggedButton({ sectionId, buttonIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetSectionId, targetButtonIndex) => {
    e.preventDefault();
    if (!draggedButton) return;

    const newData = JSON.parse(JSON.stringify(dashboardData));
    const sourceSection = newData.sections.find(s => s.id === draggedButton.sectionId);
    const targetSection = newData.sections.find(s => s.id === targetSectionId);
    
    const [movedButton] = sourceSection.buttons.splice(draggedButton.buttonIndex, 1);
    targetSection.buttons.splice(targetButtonIndex, 0, movedButton);
    
    setDashboardData(newData);
    addToHistory(newData);
    setDraggedButton(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-3xl font-bold text-white">読み込み中...</div>
      </div>
    );
  }

  const displayMode = isPreviewMode || !isAdminMode;

  return (
    <div 
      className={`${isFullscreen ? 'h-screen overflow-hidden' : 'min-h-screen'} flex flex-col`}
      style={{ background: dashboardData.backgroundColor }}
    >
      {showPasswordDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-blue-400" size={32} />
              <h2 className="text-2xl font-bold text-white">管理者認証</h2>
            </div>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              placeholder="パスワードを入力"
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-lg mb-4 text-white focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                ログイン
              </button>
              <button
                onClick={() => {
                  setShowPasswordDialog(false);
                  setPasswordInput('');
                }}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-semibold"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {editingButton && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-gray-700 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">ボタン編集</h2>
              <button onClick={() => setEditingButton(null)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-base font-semibold text-gray-300 mb-2">アイコン</label>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{editForm.icon || '📋'}</div>
                  <button
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 text-sm"
                  >
                    アイコンを選択
                  </button>
                </div>
                {showIconPicker && (
                  <div className="mt-2 grid grid-cols-8 gap-2 bg-gray-700 p-3 rounded-lg max-h-40 overflow-y-auto">
                    {iconList.map((icon) => (
                      <button
                        key={icon.name}
                        onClick={() => {
                          setEditForm({ ...editForm, icon: icon.name });
                          setShowIconPicker(false);
                        }}
                        className="text-2xl hover:bg-gray-600 rounded p-2 transition-colors"
                        title={icon.label}
                      >
                        {icon.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-300 mb-2">ラベル</label>
                <input
                  type="text"
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-base text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-300 mb-2">リンクURL</label>
                <input
                  type="text"
                  value={editForm.link}
                  onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-base text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              {!editingButton.isChild && (
                <div>
                  <label className="block text-base font-semibold text-gray-300 mb-2">ボタンの色を選択</label>
                  
                  <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                    {colorPalettes.map((palette) => (
                      <button
                        key={palette.name}
                        onClick={() => setEditForm({ ...editForm, color: palette.value, pattern: palette.pattern })}
                        className={`relative h-20 rounded-lg hover:scale-105 transition-transform shadow-lg border-2 ${
                          editForm.color === palette.value && editForm.pattern === palette.pattern ? 'border-blue-400 ring-2 ring-blue-400' : 'border-transparent'
                        }`}
                        style={{ 
                          background: getButtonBackground(palette.value, palette.pattern),
                          backgroundSize: palette.pattern === 'dots' ? '15px 15px' : 'auto'
                        }}
                        title={palette.name}
                      >
                        <span className="text-xs text-white font-bold bg-black/40 px-2 py-1 rounded">{palette.name}</span>
                        {editForm.color === palette.value && editForm.pattern === palette.pattern && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-700 rounded-lg p-2 mt-3">
                    <p className="text-xs text-gray-400 mb-2">現在選択中：</p>
                    <div 
                      className="h-12 rounded-lg shadow-inner border border-gray-600"
                      style={{ 
                        background: getButtonBackground(editForm.color, editForm.pattern || 'none'),
                        backgroundSize: editForm.pattern === 'dots' ? '15px 15px' : 'auto'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={saveButtonEdit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base font-semibold"
              >
                保存
              </button>
              <button
                onClick={() => {
                  setEditingButton(null);
                  setShowIconPicker(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-base font-semibold"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {editingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">セクション編集</h2>
              <button onClick={() => setEditingSection(null)} className="text-gray-400 hover:text-white">
                <X size={28} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2">セクション名</label>
                <input
                  type="text"
                  value={editingSection.label}
                  onChange={(e) => setEditingSection({ ...editingSection, label: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2">サブタイトル（任意）</label>
                <input
                  type="text"
                  value={editingSection.subtitle}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                  placeholder="例: (受注モニタ)"
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveSectionEdit}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
              >
                保存
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-semibold"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {showStyleEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">背景スタイル編集</h2>
              <button onClick={() => setShowStyleEditor(false)} className="text-gray-400 hover:text-white">
                <X size={28} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-3">背景パターンを選択</label>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {backgroundPatterns.map((pattern) => (
                    <button
                      key={pattern.name}
                      onClick={() => setDashboardData({ ...dashboardData, backgroundColor: pattern.value })}
                      className={`relative h-24 rounded-lg hover:scale-105 transition-transform shadow-lg border-2 ${
                        dashboardData.backgroundColor === pattern.value ? 'border-blue-400 ring-2 ring-blue-400' : 'border-transparent'
                      }`}
                      style={{ background: pattern.value }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                        <span className="text-white text-base font-bold text-center px-2">{pattern.name}</span>
                      </div>
                      {dashboardData.backgroundColor === pattern.value && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-2">現在選択中：</p>
                  <div 
                    className="h-20 rounded-lg shadow-inner border border-gray-600"
                    style={{ background: dashboardData.backgroundColor }}
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowStyleEditor(false)}
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      <div className={`${isFullscreen ? 'p-4' : 'p-6'} max-w-7xl mx-auto w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className={`${isFullscreen ? 'text-4xl' : 'text-5xl'} font-bold text-white tracking-wide drop-shadow-lg`}>
            {dashboardData.title}
          </h1>
          <div className="flex gap-2 flex-wrap">
            {isAdminMode && (
              <>
                <button
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold shadow-lg border ${
                    historyIndex <= 0 
                      ? 'bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed' 
                      : 'bg-gray-800 text-white hover:bg-gray-700 border-gray-700'
                  }`}
                  title="元に戻す (Ctrl+Z)"
                >
                  <Undo size={20} />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold shadow-lg border ${
                    historyIndex >= history.length - 1
                      ? 'bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed' 
                      : 'bg-gray-800 text-white hover:bg-gray-700 border-gray-700'
                  }`}
                  title="やり直す (Ctrl+Y)"
                >
                  <Redo size={20} />
                </button>
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-lg border border-gray-700 cursor-pointer">
                  <Upload size={20} />
                  <span className="hidden sm:inline">インポート</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-lg border border-gray-700"
                >
                  <Download size={20} />
                  <span className="hidden sm:inline">エクスポート</span>
                </button>
              </>
            )}
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-lg border border-gray-700"
            >
              <Maximize2 size={20} />
              <span className="hidden sm:inline">{isFullscreen ? '通常' : '全画面'}</span>
            </button>
            {isAdminMode && (
              <>
                <button
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold shadow-lg border ${
                    isPreviewMode 
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700 border-yellow-500' 
                      : 'bg-gray-800 text-white hover:bg-gray-700 border-gray-700'
                  }`}
                >
                  <Eye size={20} />
                  <span className="hidden sm:inline">プレビュー</span>
                </button>
                <button
                  onClick={() => setShowStyleEditor(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-lg border border-purple-500"
                >
                  <Palette size={20} />
                  <span className="hidden sm:inline">スタイル</span>
                </button>
                <button
                  onClick={saveData}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg border border-green-500"
                >
                  <Save size={20} />
                  <span className="hidden sm:inline">保存</span>
                </button>
              </>
            )}
            <button
              onClick={() => {
                if (isAdminMode) {
                  setIsAdminMode(false);
                  setIsPreviewMode(false);
                } else {
                  setShowPasswordDialog(true);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold shadow-lg border ${
                isAdminMode 
                  ? 'bg-red-600 text-white hover:bg-red-700 border-red-500' 
                  : 'bg-gray-800 text-white hover:bg-gray-700 border-gray-700'
              }`}
            >
              <Settings size={20} />
              <span className="hidden sm:inline">{isAdminMode ? 'ユーザー' : '管理者'}</span>
            </button>
          </div>
        </div>
        {isAdminMode && !isPreviewMode && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 border-l-4 border-yellow-600 p-3 rounded-lg shadow-lg mb-4">
            <p className="text-sm font-bold text-gray-900">
              🔧 管理者モード | 
              <button onClick={addSection} className="ml-3 underline hover:text-white">
                ➕ セクション追加
              </button>
            </p>
          </div>
        )}
        {isPreviewMode && (
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 border-l-4 border-blue-600 p-3 rounded-lg shadow-lg mb-4">
            <p className="text-sm font-bold text-white">
              👁️ プレビューモード
            </p>
          </div>
        )}
      </div>

      <div className={`flex-1 ${isFullscreen ? 'overflow-hidden' : ''} max-w-7xl mx-auto w-full px-6 pb-6`}>
        <div className={`${isFullscreen ? 'h-full flex flex-col' : 'space-y-4'}`}>
          {dashboardData.sections.map((section, sectionIndex) => (
            <div 
              key={section.id}
              className={`backdrop-blur-sm bg-gray-900/70 rounded-xl shadow-2xl border border-gray-800 ${
                isFullscreen ? 'flex-1 flex flex-col' : 'p-5'
              } ${isFullscreen && sectionIndex < dashboardData.sections.length - 1 ? 'mb-2' : ''}`}
              style={isFullscreen ? { padding: '12px' } : { padding: '20px' }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div 
                  className="px-5 py-2 rounded-lg shadow-lg flex-1"
                  style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}
                >
                  <h2 className={`${isFullscreen ? 'text-xl' : 'text-2xl'} font-bold text-white`}>{section.label}</h2>
                  {section.subtitle && (
                    <p className={`${isFullscreen ? 'text-sm' : 'text-base'} text-gray-400`}>{section.subtitle}</p>
                  )}
                </div>
                {(isAdminMode && !isPreviewMode) && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => addButtonToSection(section.id)}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      title="新しいボタンを追加"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => editSection(section)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      title="セクション編集"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      title="セクション削除"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className={`grid grid-cols-6 gap-3 ${isFullscreen ? 'flex-1' : ''}`}>
                {section.buttons.map((button, buttonIndex) => (
                  <div 
                    key={button.id}
                    className="relative group"
                    draggable={isAdminMode && !isPreviewMode}
                    onDragStart={(e) => handleDragStart(e, section.id, buttonIndex)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, section.id, buttonIndex)}
                    style={{ padding: '4px' }}
                  >
                    <button
                      data-button-id={button.id}
                      onClick={() => {
                        if (isAdminMode && !isPreviewMode) {
                          openEditDialog(section.id, button);
                        } else {
                          handleButtonClick(button.link, button.id);
                        }
                      }}
                      className={`w-full ${isFullscreen ? 'h-16' : 'h-20'} rounded-lg font-bold ${isFullscreen ? 'text-base' : 'text-lg'} shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-visible border border-white/10 flex flex-col items-center justify-center gap-1`}
                      style={{ 
                        background: getButtonBackground(
                          button.color, 
                          button.pattern || 'none', 
                          button.link && button.link.trim() !== '',
                          button.children
                        ),
                        backgroundSize: button.pattern === 'dots' ? '15px 15px' : 'auto',
                        cursor: (isAdminMode && !isPreviewMode) ? 'move' : 'pointer',
                        padding: '8px'
                      }}
                    >
                      {(isAdminMode && !isPreviewMode) && (
                        <GripVertical 
                          size={20} 
                          className="absolute top-2 left-2 text-white/60 z-10"
                        />
                      )}
                      {button.icon && <span className="text-2xl">{button.icon}</span>}
                      <span className="relative z-10 text-white drop-shadow-lg">{button.label}</span>
                      
                      {/* 子メニューがある場合は▼ボタンを表示 */}
                      {button.children && button.children.length > 0 && !isAdminMode && (
                        <button
                          onClick={(e) => handleToggleSubmenu(button.id, e)}
                          className="absolute bottom-1 right-1 text-white/90 hover:text-white hover:bg-white/30 rounded px-2 py-1 transition-all z-20 shadow-lg"
                          style={{ fontSize: '16px', fontWeight: 'bold' }}
                        >
                          {expandedMenu === button.id ? '▲' : '▼'}
                        </button>
                      )}
                      
                      {(isAdminMode && !isPreviewMode) && (
                        <Edit2 
                          size={18} 
                          className="absolute top-2 right-2 text-white/80 z-10"
                        />
                      )}
                    </button>

                    {(isAdminMode && !isPreviewMode) && (
                      <div className="mt-2 bg-gray-800/90 rounded-lg p-2 border border-gray-700">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-bold text-xs text-gray-400">子ボタン:</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addChildButton(section.id, button.id);
                            }}
                            className="text-green-400 hover:text-green-300 flex items-center gap-1 text-xs font-semibold"
                          >
                            <Plus size={14} />
                            追加
                          </button>
                        </div>
                        {button.children && button.children.length > 0 ? (
                          <div className="space-y-1">
                            {button.children.map((child, idx) => (
                              <div key={child.id} className="flex gap-1 items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditDialog(section.id, child, true, button.id, idx);
                                  }}
                                  className="flex-1 text-left px-2 py-1 hover:bg-gray-700 rounded text-xs font-semibold text-gray-300 flex items-center gap-1"
                                >
                                  {child.icon && <span>{child.icon}</span>}
                                  <span>{child.label}</span>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChildButton(section.id, button.id, idx);
                                  }}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 italic">なし</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {expandedMenu && submenuPosition && displayMode && (
        <div 
          className="fixed bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-3 min-w-[280px] border border-gray-700 animate-slideDown submenu-container"
          style={{
            zIndex: 99999,
            left: `${Math.min(window.innerWidth - 300, submenuPosition.left)}px`,
            top: `${submenuPosition.top}px`,
            pointerEvents: 'auto'
          }}
        >
          <div className="space-y-0.5">
            {dashboardData.sections
              .flatMap(s => s.buttons)
              .find(b => b.id === expandedMenu)
              ?.children?.map((child) => (
                <button
                  key={child.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(child.link, child.id);
                    // クリック後は子メニューを閉じる
                    setExpandedMenu(null);
                    setSubmenuPosition(null);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #9333ea)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(55, 65, 81, 0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  className="w-full px-5 py-2.5 text-lg font-bold rounded-lg text-left flex items-center gap-3 cursor-pointer"
                  style={{
                    background: 'rgba(55, 65, 81, 0.3)',
                    color: (!child.link || child.link.trim() === '') ? 'rgba(255, 255, 255, 0.5)' : 'white',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {child.icon && <span className="text-2xl" style={{
                    opacity: (!child.link || child.link.trim() === '') ? 0.5 : 1
                  }}>{child.icon}</span>}
                  <span>{child.label}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {showSaveSuccessDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-700">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-white mb-2">保存しました</h2>
              <p className="text-gray-400">データが正常に保存されました</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowSaveSuccessDialog(false);
                  setIsPreviewMode(false);
                }}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg transition-colors"
              >
                管理者画面に戻る
              </button>
              <button
                onClick={() => {
                  setShowSaveSuccessDialog(false);
                  setIsAdminMode(false);
                  setIsPreviewMode(false);
                }}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-bold text-lg transition-colors"
              >
                管理者画面を終わる
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
      `}</style>
    </div>
  );
};

export default KKBHDashboard;
