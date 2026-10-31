import fs from 'node:fs';
import path from 'node:path';
import { buildFieldGuide, trustLinks } from './build-field-guide.mjs';
import { fixLinks } from './fix-links.mjs';

const root = path.resolve('dist');
const fieldGuideRoutes = buildFieldGuide(root);
const libraryFile = path.join(root, 'guide/index.html');
let library = fs.readFileSync(libraryFile, 'utf8').replace(/<!-- field-guide-library:start -->[\s\S]*?<!-- field-guide-library:end -->/g, '');
const libraryLinks = fieldGuideRoutes.filter(route => route.startsWith('guide/')).map(route => {
  const html = fs.readFileSync(path.join(root, route, 'index.html'), 'utf8');
  return `<li><a href="/${route}">${html.match(/<h1>([^<]+)<\/h1>/)[1]}</a></li>`;
}).join('');
library = library.replace('</main>', `<!-- field-guide-library:start --><section class="shell section guide-content"><h2>Field guide topics and class builds</h2><ul>${libraryLinks}</ul></section><!-- field-guide-library:end --></main>`);
fs.writeFileSync(libraryFile, library);
const origin = 'https://azerothsurvivors.shop';
const footerLegal = {
  en: {
    heading: 'About this fan guide',
    text: 'Azeroth Survivors is a free browser fan game created by Aethus and runs on the creator’s website. This independent guide is not affiliated with or endorsed by Aethus or Blizzard Entertainment. World of Warcraft is a trademark of Blizzard Entertainment. This site does not host or distribute the game or its files. Artwork on this site is original illustration, not game footage.',
  },
  'de-de': {
    heading: 'Über diesen Fan-Guide',
    text: 'Azeroth Survivors ist ein kostenloses Browser-Fan-Spiel von Aethus und läuft auf der Website des Entwicklers. Dieser unabhängige Guide ist weder mit Aethus noch mit Blizzard Entertainment verbunden oder von ihnen unterstützt. World of Warcraft ist eine Marke von Blizzard Entertainment. Wir hosten oder verbreiten weder das Spiel noch seine Dateien. Die Illustrationen auf dieser Website sind Originalillustrationen und kein Gameplay-Material.',
  },
  'fr-fr': {
    heading: 'À propos de ce guide de fans',
    text: 'Azeroth Survivors est un jeu de fans gratuit sur navigateur créé par Aethus et hébergé sur le site du créateur. Ce guide indépendant n’est ni affilié à Aethus ou Blizzard Entertainment, ni approuvé par eux. World of Warcraft est une marque de Blizzard Entertainment. Nous n’hébergeons ni ne distribuons le jeu ou ses fichiers. Les illustrations de ce site sont originales et ne sont pas des images du jeu.',
  },
  'ja-jp': {
    heading: 'このファンガイドについて',
    text: 'Azeroth SurvivorsはAethusが制作し、開発者のウェブサイトで提供される無料のブラウザ向けファンゲームです。この独立ガイドはAethusおよびBlizzard Entertainmentとは無関係で、承認も受けていません。World of WarcraftはBlizzard Entertainmentの商標です。当サイトはゲームやそのファイルをホストまたは配布していません。掲載イラストは独自の挿絵であり、ゲーム画面ではありません。',
  },
  'zh-cn': {
    heading: '关于本粉丝指南',
    text: 'Azeroth Survivors 是由 Aethus 制作、运行于开发者网站的免费浏览器粉丝游戏。本网站是独立攻略指南，与 Aethus 或暴雪娱乐无关联，也未获得其认可。《魔兽世界》是暴雪娱乐的商标。本网站不托管或分发游戏及其文件。本站插画为原创示意图，并非游戏实机画面。',
  },
};

const locales = [
  { slug: 'en-us', code: 'en-US', name: 'English (US)', short: 'US', country: 'US' },
  { slug: 'en-gb', code: 'en-GB', name: 'English (UK)', short: 'UK', country: 'GB' },
  { slug: 'en-ca', code: 'en-CA', name: 'English (Canada)', short: 'CA', country: 'CA' },
  { slug: 'en-au', code: 'en-AU', name: 'English (Australia)', short: 'AU', country: 'AU' },
  { slug: 'de-de', code: 'de-DE', name: 'Deutsch', short: 'DE', country: 'DE' },
  { slug: 'fr-fr', code: 'fr-FR', name: 'Français', short: 'FR', country: 'FR' },
  { slug: 'ja-jp', code: 'ja-JP', name: '日本語', short: 'JP', country: 'JP' },
  { slug: 'zh-cn', code: 'zh-CN', name: '简体中文', short: '中国', country: 'CN' },
];

const translations = {
  'de-de': {
    title: 'Azeroth Survivors – kostenloser Spiel- und Überlebensguide', description: 'Tipps zu Azeroth Survivors: erster Lauf, Klassen, Builds, Zonenfortschritt und Lösungen für WebGPU-, Leistungs- und Speicherprobleme.', guideTitle: 'Azeroth Survivors Guide: Tipps, Builds und Fehlerbehebung', guideDescription: 'Ein unabhängiger Guide mit Tipps für den ersten Lauf, Builds, Fortschritt und häufige technische Probleme.',
    home: 'Startseite', guides: 'Guides', about: 'Über das Spiel', faq: 'FAQ', play: 'Spiel öffnen', kicker: 'UNABHÄNGIGER FAN-GUIDE', hero: 'Überlebe die <span>Wellen</span>', lead: 'Ein Browser-Survival-Roguelike in der Welt von Azeroth. Deine Fähigkeiten greifen automatisch an – deine Bewegung und Verbesserungen entscheiden über den Lauf.', explore: 'Guide entdecken', noAccount: 'Kostenlos · kein Konto nötig', overview: 'Der Einstieg in Azeroth Survivors', overviewText: 'Wähle Volk, Klasse und Zone. Bleib in Bewegung, sammle Erfahrung und passe deinen Build an die Gegner an. Das Spiel wird auf der Website des Entwicklers Aethus geöffnet.', guideHeading: 'Hilfe für die kniffligen Stellen', guideLead: 'Praktische Antworten für den ersten Lauf, Builds und typische Browserprobleme.', firstTitle: 'Der erste Lauf', firstText: 'Bewegung, Erfahrung sammeln, Karten wählen und den ersten Boss vorbereiten.', buildTitle: 'Builds und Fortschritt', buildText: 'Eine Schadensstrategie verfolgen, Schwächen ausgleichen und Zonen freischalten.', fixTitle: 'WebGPU, Ruckler und Speicherstände', fixText: 'Fehlermeldungen einordnen und gezielt Browser, Grafik und Speicher prüfen.', readGuide: 'Detaillierten Guide auf Englisch lesen', quickTitle: 'Schnellstart', quick1: 'Wähle eine Klasse und starte in Elwynn Forest.', quick2: 'Bewege dich mit WASD oder den Pfeiltasten; Angriffe laufen automatisch.', quick3: 'Sammle Erfahrung und wähle bei jedem Levelaufstieg eine passende Karte.', quick4: 'Bleib vor Bossen in offenem Gelände und halte einen Fluchtweg frei.', faqTitle: 'Häufige Fragen', q1: 'Ist Azeroth Survivors ein offizielles Blizzard-Spiel?', a1: 'Nein. Es ist ein Fanprojekt von Aethus. Dieser Guide ist ebenfalls unabhängig und nicht mit Blizzard verbunden.', q2: 'Muss ich eine Taste zum Angreifen drücken?', a2: 'Nein. Fähigkeiten greifen automatisch an. Deine Hauptaufgaben sind Bewegung, Ausweichen und die Wahl der Verbesserungen.', q3: 'Warum ist mein Speicherstand verschwunden?', a3: 'Spielstände sind an Browser und Website gebunden. Öffne die ursprüngliche Spielseite und exportiere den Speicherstand vor einem Browser- oder Gerätewechsel.', q4: 'Was hilft bei „WebGPU nicht verfügbar“?', a4: 'Aktualisiere den Browser, aktiviere die Hardwarebeschleunigung und starte ihn neu. Prüfe bei einem Laptop auch, ob der Browser die leistungsstarke GPU verwendet.', disclaimer: 'Unabhängiger Fan-Guide. Wir hosten weder das Spiel noch dessen Dateien und sind nicht mit Aethus oder Blizzard verbunden.', guideKicker: 'AZEROTH SURVIVORS · GUIDE-BIBLIOTHEK', guideHero: 'Spieltipps und <span>Lösungen</span>', guideLead: 'Starte mit den Grundlagen und finde schnelle Antworten auf die häufigsten Probleme.', quickFix: 'Schnelle Lösungen', quickFixText: 'WebGPU fehlt? Browser aktualisieren und Hardwarebeschleunigung prüfen. Spiel ruckelt? Render-Skalierung senken und Hintergrundprogramme schließen. Spielstand fehlt? Zur ursprünglichen Website zurückkehren und dort exportieren.', buildTip: 'Build-Tipp', buildTipText: 'Verbessere eine Hauptfähigkeit gezielt. Wenn du vor dem Boss stirbst, nimm eine defensive Karte; wenn Gegner sich stauen, wähle Flächenschaden oder mehr Ziele.', zoneTip: 'Fortschritts-Tipp', zoneTipText: 'Zonen werden pro Klasse freigeschaltet. Wiederhole eine leichtere Zone, um Erfahrung zu sammeln, bevor du die nächste versuchst.', englishNote: 'Die ausführlichen Schritt-für-Schritt-Artikel sind derzeit auf Englisch verfügbar.',
  },
  'fr-fr': {
    title: 'Azeroth Survivors — guide gratuit du jeu et de survie', description: 'Conseils pour Azeroth Survivors : première partie, classes, builds, progression des zones et solutions WebGPU, performances et sauvegardes.', guideTitle: 'Guide Azeroth Survivors : conseils, builds et dépannage', guideDescription: 'Un guide indépendant pour la première partie, les builds, la progression et les problèmes techniques courants.',
    home: 'Accueil', guides: 'Guides', about: 'Le jeu', faq: 'FAQ', play: 'Ouvrir le jeu', kicker: 'GUIDE DE FANS INDÉPENDANT', hero: 'Survivez aux <span>vagues</span>', lead: 'Un roguelike de survie dans l’univers d’Azeroth, jouable dans le navigateur. Vos sorts attaquent seuls : vos déplacements et vos améliorations font la différence.', explore: 'Voir le guide', noAccount: 'Gratuit · sans compte', overview: 'Bien débuter dans Azeroth Survivors', overviewText: 'Choisissez une race, une classe et une zone. Restez en mouvement, récupérez de l’expérience et adaptez votre build aux ennemis. Le jeu s’ouvre sur le site de son créateur, Aethus.', guideHeading: 'Des réponses aux moments difficiles', guideLead: 'Des conseils pratiques pour la première partie, les builds et les problèmes de navigateur.', firstTitle: 'Votre première partie', firstText: 'Déplacements, expérience, choix des cartes et préparation au premier boss.', buildTitle: 'Builds et progression', buildText: 'Concentrez vos dégâts, corrigez vos points faibles et débloquez les zones.', fixTitle: 'WebGPU, ralentissements et sauvegardes', fixText: 'Comprenez les erreurs et vérifiez navigateur, carte graphique et sauvegarde.', readGuide: 'Lire le guide détaillé en anglais', quickTitle: 'Démarrage rapide', quick1: 'Choisissez une classe et commencez dans la forêt d’Elwynn.', quick2: 'Déplacez-vous avec WASD ou les flèches ; les attaques sont automatiques.', quick3: 'Récupérez l’expérience et choisissez une carte à chaque niveau.', quick4: 'Avant un boss, restez dans un espace dégagé et gardez une voie de fuite.', faqTitle: 'Questions fréquentes', q1: 'Azeroth Survivors est-il un jeu officiel de Blizzard ?', a1: 'Non. C’est un projet de fans créé par Aethus. Ce guide est également indépendant et n’est pas affilié à Blizzard.', q2: 'Faut-il appuyer sur une touche pour attaquer ?', a2: 'Non. Les sorts se déclenchent automatiquement. Déplacez-vous, esquivez et choisissez vos améliorations.', q3: 'Pourquoi ma sauvegarde a-t-elle disparu ?', a3: 'La progression dépend du navigateur et du site utilisés. Retournez sur la page de jeu d’origine et exportez la sauvegarde avant de changer de navigateur ou d’appareil.', q4: 'Comment corriger l’erreur « WebGPU indisponible » ?', a4: 'Mettez le navigateur à jour, activez l’accélération matérielle puis redémarrez-le. Sur un portable, vérifiez que le navigateur utilise le GPU performant.', disclaimer: 'Guide de fans indépendant. Nous n’hébergeons ni le jeu ni ses fichiers et ne sommes affiliés ni à Aethus ni à Blizzard.', guideKicker: 'AZEROTH SURVIVORS · BIBLIOTHÈQUE DE GUIDES', guideHero: 'Conseils de jeu et <span>solutions</span>', guideLead: 'Apprenez les bases et trouvez des réponses rapides aux problèmes fréquents.', quickFix: 'Solutions rapides', quickFixText: 'WebGPU absent ? Mettez le navigateur à jour et vérifiez l’accélération matérielle. Jeu saccadé ? Réduisez l’échelle de rendu et fermez les applications en arrière-plan. Sauvegarde manquante ? Revenez sur le site d’origine et exportez-la.', buildTip: 'Conseil de build', buildTipText: 'Renforcez une compétence principale. Si vous mourez avant le boss, choisissez une carte défensive ; si les ennemis s’accumulent, prenez des dégâts de zone ou des cibles supplémentaires.', zoneTip: 'Conseil de progression', zoneTipText: 'Les zones se débloquent classe par classe. Rejouez une zone plus facile pour gagner de l’expérience avant de tenter la suivante.', englishNote: 'Les articles détaillés étape par étape sont actuellement disponibles en anglais.',
  },
  'ja-jp': {
    title: 'Azeroth Survivors攻略ガイド｜初心者・ビルド・不具合対策', description: 'Azeroth Survivorsの初心者向け攻略。初回プレイ、クラス、ビルド、ゾーン進行、WebGPUや動作の不具合、セーブデータの対処法を紹介します。', guideTitle: 'Azeroth Survivors攻略：ビルドとトラブル対策', guideDescription: '初回プレイからビルド、ゾーン攻略、よくある技術的な問題までをまとめた非公式ガイドです。',
    home: 'ホーム', guides: '攻略ガイド', about: 'ゲームについて', faq: 'よくある質問', play: 'ゲームを開く', kicker: '独立系ファンガイド', hero: '敵の波を<span>生き延びよう</span>', lead: 'アゼロスの世界を舞台にした、ブラウザーで遊べるサバイバルローグライク。攻撃は自動で発動します。移動と強化の選択が勝敗を左右します。', explore: 'ガイドを見る', noAccount: '無料 · アカウント不要', overview: 'Azeroth Survivorsの遊び方', overviewText: '種族、クラス、ゾーンを選び、移動しながら経験値を集めましょう。敵に合わせてビルドを調整します。ゲームは開発者Aethusのサイトで起動します。', guideHeading: '困ったときに役立つ攻略', guideLead: '初回プレイ、ビルド作成、ブラウザーの問題を解決する実用的なヒント。', firstTitle: '初めてのラン', firstText: '移動、経験値の回収、カード選択、最初のボスへの準備。', buildTitle: 'ビルドと進行', buildText: '主力の攻撃を伸ばし、弱点を補ってゾーンを解放しましょう。', fixTitle: 'WebGPU・動作の重さ・セーブ', fixText: 'エラーの原因を見分け、ブラウザーやGPU、セーブを確認します。', readGuide: '詳しいガイド（英語）を読む', quickTitle: 'クイックスタート', quick1: 'クラスを選び、最初のゾーン「エルウィンの森」に入ります。', quick2: 'WASDまたは矢印キーで移動。攻撃は自動で行われます。', quick3: '経験値を拾い、レベルアップ時にカードを1枚選びます。', quick4: 'ボス戦の前に開けた場所へ移動し、逃げ道を確保しましょう。', faqTitle: 'よくある質問', q1: 'Azeroth SurvivorsはBlizzard公式ゲームですか？', a1: 'いいえ。Aethusが制作したファンプロジェクトです。このガイドも独立した非公式サイトです。', q2: '攻撃するにはキー入力が必要ですか？', a2: 'いいえ。スキルは自動で発動します。移動、回避、強化カードの選択が主な操作です。', q3: 'セーブデータが消えたのはなぜですか？', a3: 'セーブは利用したブラウザーとゲームサイトに保存されます。元のゲームページを開き、ブラウザーや端末を変える前にデータをエクスポートしてください。', q4: '「WebGPUが利用できません」と表示されたら？', a4: 'ブラウザーを更新し、ハードウェアアクセラレーションを有効にして再起動します。ノートPCでは高性能GPUが選ばれているか確認してください。', disclaimer: '独立したファンガイドです。ゲームやファイルは配布していません。AethusおよびBlizzardとは関係ありません。', guideKicker: 'AZEROTH SURVIVORS · 攻略ガイド', guideHero: '攻略のヒントと<span>解決方法</span>', guideLead: '基本を押さえ、よくある問題への対処を確認しましょう。', quickFix: 'よくある不具合の対処', quickFixText: 'WebGPUがない場合：ブラウザーを更新し、ハードウェアアクセラレーションを確認。動作が重い場合：描画スケールを下げ、他のアプリを閉じます。セーブが見つからない場合：最初に遊んだサイトでデータをエクスポートしてください。', buildTip: 'ビルドのコツ', buildTipText: '主力スキルを決めて強化します。ボス前に倒されるなら防御系カードを、敵が増えすぎるなら範囲攻撃や対象数を増やすカードを選びましょう。', zoneTip: '進行のコツ', zoneTipText: 'ゾーン解放はクラスごとです。次のゾーンが難しいときは、前のゾーンを再プレイして経験値を集めましょう。', englishNote: '詳しい手順をまとめた記事は現在英語版のみです。',
  },
  'zh-cn': {
    title: '艾泽拉斯幸存者 攻略｜职业选择、配装、卡顿修复与存档', description: '艾泽拉斯幸存者（Azeroth Survivors）中文攻略：9 个职业怎么选、配装与区域推进顺序，以及 WebGPU 报错、卡顿和存档丢失的解决办法。', guideTitle: 'Azeroth Survivors 攻略：配装、区域推进与故障排查', guideDescription: '独立玩家指南，涵盖新手首局、构筑思路、区域进度和常见浏览器问题。',
    home: '首页', guides: '攻略', about: '游戏简介', faq: '常见问题', play: '前往游戏', kicker: '独立玩家指南', hero: '艾泽拉斯幸存者 攻略：<span>从选职业到修复卡顿</span>', lead: '一款以艾泽拉斯为背景的浏览器生存肉鸽游戏。技能会自动攻击，走位和升级选择决定你能走多远。', explore: '查看攻略', noAccount: '免费 · 无需账号', overview: '快速了解 Azeroth Survivors', overviewText: '选择种族、职业和区域，在移动中收集经验，并根据敌人调整构筑。游戏由开发者 Aethus 托管，点击后会前往其官方网站。', guideHeading: '按问题找攻略', guideLead: '从第一局到配装思路，再到浏览器和存档故障的处理办法。', firstTitle: '新手第一局', firstText: '掌握走位、收集经验、选择升级卡，并为首领战预留空间。', buildTitle: '配装与区域推进', buildText: '围绕核心技能强化，补足短板，逐步解锁新区域。', fixTitle: 'WebGPU、卡顿与存档', fixText: '判断问题原因，逐项检查浏览器、显卡和存档位置。', readGuide: '阅读英文详细攻略', quickTitle: '快速开始', quick1: '选择职业，从第一个区域「艾尔文森林」开始。', quick2: '用 WASD 或方向键移动；技能会自动攻击。', quick3: '拾取经验，升级时从卡牌中选择一项强化。', quick4: '首领出现前移向开阔地带，并留好撤退路线。', faqTitle: '常见问题', q1: 'Azeroth Survivors 是暴雪官方游戏吗？', a1: '不是。这是 Aethus 制作的粉丝项目。本网站也是独立攻略站，与暴雪无关。', q2: '需要按键攻击吗？', a2: '不需要，技能会自动攻击。玩家主要负责移动、躲避敌人和选择升级。', q3: '为什么我的存档不见了？', a3: '存档与使用的浏览器及游戏网址有关。请回到最初游玩的游戏页面，并在更换浏览器或设备前导出存档。', q4: '提示「不支持 WebGPU」怎么办？', a4: '更新浏览器，开启硬件加速后重启。笔记本电脑还要确认浏览器使用的是高性能显卡。', disclaimer: '本站为独立玩家指南，不托管游戏或游戏文件，与 Aethus 或暴雪娱乐无关。', guideKicker: 'AZEROTH SURVIVORS · 攻略资料库', guideHero: '实战技巧与<span>问题解决</span>', guideLead: '先掌握基础玩法，再按问题查找对应的解决方法。', quickFix: '常见问题速查', quickFixText: '没有 WebGPU：更新浏览器并检查硬件加速。画面卡顿：降低游戏渲染比例并关闭占用资源的后台程序。存档不见：回到最初游玩的游戏网址导出存档，再导入新设备。', buildTip: '配装建议', buildTipText: '先确定一个核心输出技能，再集中强化。首领前容易倒下，就选防御卡；小怪越积越多，就优先范围伤害或增加攻击目标。', zoneTip: '推进建议', zoneTipText: '区域进度按职业分别记录。如果新区域太难，回到已通关区域继续积累该职业经验。', englishNote: '更详细的分步文章目前提供英文版。',
  },
};

Object.assign(translations['zh-cn'], {
  guideTitle: '艾泽拉斯幸存者 攻略目录｜新手第一局、配装与区域推进、卡顿修复',
  guideDescription: '艾泽拉斯幸存者（Azeroth Survivors）中文攻略目录：新手第一局怎么打、9 个职业怎么选、配装与 12 个区域推进顺序，以及 WebGPU 报错、卡顿和存档丢失的修复办法。',
  guideHero: '艾泽拉斯幸存者 攻略目录',
  guideIndexLead: '这一页是三篇中文长文的入口。先看哪一篇，取决于你现在卡在哪一步。',
  guideCardLabels: ['艾泽拉斯幸存者 新手第一局怎么打', '艾泽拉斯幸存者 配装与区域推进', '艾泽拉斯幸存者 卡顿与存档修复'],
  homeCardLabels: ['艾泽拉斯幸存者 新手第一局怎么打', '艾泽拉斯幸存者 配装与区域推进', '艾泽拉斯幸存者 卡顿与存档修复'],
  homeGuideAction: '按问题找攻略',
  overviewHeading: '艾泽拉斯幸存者 是什么',
  moreGuidesLabel: '英文攻略',
  quickHeading: '新手第一局怎么打',
  heroSub: '选种族、选职业、进区域，边打边收经验，按敌人调整构筑。游戏不在本站运行，我们只把上手和排障的细节写清楚。',
  faqLead: '四个高频疑问：游戏的性质、操作方式、存档位置，以及 WebGPU 支持情况。',
  step1Title: '打开游戏', step2Title: '选职业', step3Title: '选区域开打', step4Title: '收集经验升级',
  quick1: '进入游戏页面，不用注册、不用下载。',
  quick2: '在 9 个职业里挑一个适合新手的。',
  quick3: '从第一个区域「艾尔文森林」开始，WASD 移动，技能自动攻击。',
  quick4: '升级时三选一强化，为首领战留好位置。',
  articleQuick1: '选择职业，从第一个区域「艾尔文森林」开始。',
  articleQuick2: '用 WASD 或方向键移动；技能会自动攻击。',
  articleQuick3: '拾取经验，升级时从卡牌中选择一项强化。',
  articleQuick4: '首领出现前移向开阔地带，并留好撤退路线。',
  firstRunArticle: {
    title: '艾泽拉斯幸存者 新手第一局怎么打｜从选职业到第一个首领',
    description: '艾泽拉斯幸存者（Azeroth Survivors）新手第一局怎么开局：选哪个职业、第一个区域艾尔文森林怎么打、升级卡怎么选，以及第一个首领出现前要做的准备。',
    h1: '艾泽拉斯幸存者 新手第一局怎么打',
    tocTitle: '本页目录',
    sections: [
      { id: 'start', title: '开局只需要定两件事', html: '<p>第一局先决定职业和区域，别在选择界面反复比较技能。职业会改变自动攻击和接敌方式；新手先看懂当前能力，再据此选卡。</p><p>想留出容错空间，可试圣骑士或战士；偏好与敌人保持距离，可选猎人。区域先选艾尔文森林，这是路线起点，适合熟悉移动、收集经验和升级。跑过一局再判断是否合手，比追求一次选到最佳更实际。</p>' },
      { id: 'steps', title: '艾泽拉斯幸存者 第一局：四步走完', html: '<p>艾泽拉斯幸存者的基本循环是移动、收集经验、选择升级卡；技能自动攻击，所以开局要边走边观察敌群。按下面的顺序开始即可。</p><ol><li>打开游戏：在浏览器进入开发者的游戏页面；本站只提供攻略。</li><li>选职业：选容易理解的角色；圣骑士或战士较有容错，猎人适合拉开距离。</li><li>选区域开打：进入艾尔文森林，用 WASD 或方向键移动，让技能自动攻击。</li><li>拾取经验升级选卡：安全时捡经验；升级后选支援输出或弥补生存短板的卡。</li></ol>' },
      { id: 'boss', title: '第一个首领怎么过', html: '<p>艾泽拉斯幸存者的艾尔文森林一共有五个首领，第一个在 3 分钟出现，终局首领在 16 分钟出现。保持移动，首领出现前先移向开阔地。</p><div class="guide-table-wrap"><table class="guide-table"><thead><tr><th>时间</th><th>首领</th><th>出现时要做什么</th></tr></thead><tbody><tr><td>3:00</td><td>霍格 Hogger</td><td>提前移向开阔地，留出转向空间。</td></tr><tr><td>6:00</td><td>Mother Fang</td><td>保持移动，别让敌群堵住退路。</td></tr><tr><td>9:00</td><td>Rhahk\'Zor</td><td>先清出空间，再沿开阔处移动。</td></tr><tr><td>12:00</td><td>斯密特先生 Mr. Smite</td><td>留好撤退路线，不要停下输出。</td></tr><tr><td>16:00</td><td>埃德温·范克里夫 Edwin VanCleef</td><td>移向空地，别为经验光点切入敌群。</td></tr></tbody></table></div>' },
      { id: 'mistakes', title: '第一局最容易犯的三个错', html: '<ol><li><strong>只站在原地输出。</strong>自动攻击不代表角色可以停住。沿开阔处移动，转弯前确认有路；首领出现时也继续走。</li><li><strong>升级只选攻击。</strong>若常在首领前倒下，先考虑生命、防护或控制；若能活下来但敌人越积越多，再选范围伤害或增加攻击目标。一次处理最明显的短板。</li><li><strong>为了经验硬闯敌群。</strong>不要直线切进密集区域，先绕到空处，等敌人拉开再回收。拾取距离不足时，留意可用的范围提升或经验磁铁。</li></ol>' },
      { id: 'after', title: '第一局结束之后做什么', html: '<p>结束后判断问题是被围、清怪慢，还是选卡不成体系；下一局只改一项，方便比较。需要规划后续路线时，查看<a href="/zh-cn/guide/progression/">艾泽拉斯幸存者 配装与区域推进</a>。</p>' },
      { id: 'questions', title: '常见追问', html: '<div class="faq-list"><details><summary>第一局大概要多久？</summary><p>艾尔文森林所在的 1–4 区整局约 16 分钟；5–8 区约 18 分钟，9–12 区约 20 分钟。版本更新可能改变时长，以游戏内区域面板为准。</p></details><details><summary>选错职业要重开吗？</summary><p>结束当前局后可另开一局重新选职业。各职业的区域解锁和经验分别记录，选择不会互相转移。</p></details><details><summary>死了会掉进度吗？</summary><p>未获胜的局仍可能增加职业经验，并不意味着所有进度清零。区域解锁按职业记录，可用该职业回到已开放区域继续。</p></details></div>' }
    ]
  },
  progressionArticle: {
    title: '艾泽拉斯幸存者 配装与区域推进｜12 个区域顺序与强化思路',
    description: '艾泽拉斯幸存者（Azeroth Survivors）配装与区域推进：12 个区域的先后顺序、什么时候该换区域、升级卡该点防御还是范围伤害，以及换浏览器前怎么保住进度。',
    h1: '艾泽拉斯幸存者 配装与区域推进',
    tocTitle: '本页目录',
    sections: [
      { id: 'core', title: '先定一个核心输出技能', html: '<p>升级时先看现有哪项能力已经稳定清理敌人，再集中挑能增加伤害、覆盖或配套效果的卡；别把选择平均分散。</p><p>观察开局阶段的表现，优先强化贡献最明显的技能；暂时看不清时，先支持已有能力，再按失血或敌群堆积补短板。具体效果以当前卡牌说明为准。</p>' },
      { id: 'zones', title: '艾泽拉斯幸存者 12 个区域顺序', html: "<p>艾泽拉斯幸存者的区域进度按职业分别记录，通过当前区域后下一处才为该职业开放。下表依照英文页面的区域顺序排列；版本更新后以游戏内选择面板为准。</p><div class=\"guide-table-wrap\"><table class=\"guide-table\"><thead><tr><th>序号</th><th>区域中文名</th><th>英文原名</th><th>终局首领</th><th>前置区域</th></tr></thead><tbody><tr><td>1</td><td>艾尔文森林</td><td>Elwynn Forest</td><td>埃德温·范克里夫 Edwin VanCleef</td><td>—</td></tr><tr><td>2</td><td>暮色森林</td><td>Duskwood</td><td>摩本特·费尔 Morbent Fel</td><td>艾尔文森林</td></tr><tr><td>3</td><td>战歌峡谷</td><td>Warsong Gulch</td><td>卡扎克领主 Lord Kazzak</td><td>暮色森林</td></tr><tr><td>4</td><td>安戈洛环形山</td><td>Un'Goro Crater</td><td>莫什大王 King Mosh</td><td>战歌峡谷</td></tr><tr><td>5</td><td>阿拉希盆地</td><td>Arathi Basin</td><td>艾利登·佩雷诺德领主 Lord Aliden Perenolde</td><td>安戈洛环形山</td></tr><tr><td>6</td><td>菲拉斯</td><td>Feralas</td><td>戈多克大王 King Gordok</td><td>阿拉希盆地</td></tr><tr><td>7</td><td>古拉巴什竞技场</td><td>Gurubashi Arena</td><td>哈卡 Hakkar the Soulflayer</td><td>菲拉斯</td></tr><tr><td>8</td><td>血色修道院</td><td>Scarlet Monastery</td><td>高阶审判官怀特迈恩 High Inquisitor Whitemane</td><td>古拉巴什竞技场</td></tr><tr><td>9</td><td>奥特兰克山谷</td><td>Alterac Valley</td><td>艾索雷葛斯 Azuregos</td><td>血色修道院</td></tr><tr><td>10</td><td>黑石山</td><td>Blackrock Mountain</td><td>奈法利安 Nefarian</td><td>奥特兰克山谷</td></tr><tr><td>11</td><td>安其拉之门</td><td>Gates of Ahn'Qiraj</td><td>克苏恩 C'Thun</td><td>黑石山</td></tr><tr><td>12</td><td>纳克萨玛斯</td><td>Naxxramas</td><td>克尔苏加德 Kel'Thuzad</td><td>安其拉之门</td></tr></tbody></table></div><p><strong>本区要打多久</strong></p><ul><li>1–4 区约 16 分钟。</li><li>5–8 区约 18 分钟。</li><li>9–12 区约 20 分钟。</li></ul><p>这些局时长以游戏内区域面板为准，版本更新可能变化。</p>" },
      { id: 'switch', title: '什么时候该换下一个区域', html: '<p>艾泽拉斯幸存者该不该换区，要看这一局卡在哪里。能稳定到达首领但还没击败它，先调整走位或防御；击败首领后，再进入该职业开放的下一处。</p><p>若每局都在相近阶段倒下，判断是被围、输出不足还是选卡偏离核心，只改对应问题。也可回到已通过的区域积累职业经验。</p>' },
      { id: 'cards', title: '升级卡怎么选：防御还是范围', html: '<p>艾泽拉斯幸存者的选卡顺序是：先保持核心技能的配套；首领前容易倒下时选防御；小怪不断堆积、清不完时选范围伤害或增加攻击目标。</p><p>防御争取存活空间，范围帮助自动攻击更快处理敌群。围绕眼前最明显的问题选择，不要因出现新卡就推翻原有方向。</p>' },
      { id: 'save', title: '换设备前怎么不丢进度', html: '<p>艾泽拉斯幸存者的存档与浏览器站点数据及游戏网址绑定，迁移前先在原环境导出；目标环境已有进度时也先导出，再用游戏内导入。导入可能替换目标存档，操作前后都要核对；排查步骤见<a href="/zh-cn/guide/fixes/">艾泽拉斯幸存者 卡顿与存档修复</a>。</p>' },
      { id: 'questions', title: '常见追问', html: '<div class="faq-list"><details><summary>换职业要从第一区域重新打吗？</summary><p>要按新职业自己的区域解锁情况推进。区域进度与职业绑定，切换角色不会继承另一个职业已经开放的区域。</p></details><details><summary>区域能跳着打吗？</summary><p>通常要先完成当前职业已开放的区域，下一处才会解锁。以游戏内区域选择面板显示的开放状态为准。</p></details><details><summary>卡在哪一区域该回去刷吗？</summary><p>可以回到已通过的区域，为当前职业积累经验并继续调整强化方向；之后再尝试尚未通过的下一处。</p></details></div>' }
    ]
  },
  readGuideLocal: '查看中文攻略',
  fixArticle: {
    title: '艾泽拉斯幸存者 卡顿与存档｜WebGPU 报错、黑屏掉帧怎么修',
    description: '艾泽拉斯幸存者（Azeroth Survivors）卡顿怎么办：WebGPU 报错、掉帧、黑屏一直加载、存档丢失四类问题各自的排查顺序，以及换浏览器或设备前怎么备份存档。',
    h1: '艾泽拉斯幸存者 卡顿、WebGPU 报错与存档找回',
    tocTitle: '本页目录',
    sections: [
      { id: 'diagnose', title: '先判断你遇到的是哪一类问题', lead: '艾泽拉斯幸存者的故障可能来自浏览器能力、设备负载、页面载入或存档环境，先辨认症状再排查。先按症状定位，再动手改设置，不要一次改多个地方。', rows: [['WebGPU 报错', '浏览器或设备不支持', 'webgpu', 'WebGPU 报错怎么修'], ['卡顿、掉帧', '图形负载高或后台占用', 'performance', '卡顿、掉帧怎么处理'], ['黑屏、持续加载', '网络、载入或图形初始化', 'loading', '黑屏、一直加载不出来'], ['存档不见', '浏览器、网址或站点数据不同', 'save', '存档不见了怎么找回']] },
      { id: 'webgpu', title: '艾泽拉斯幸存者 WebGPU 报错怎么修', paragraphs: [
        '艾泽拉斯幸存者出现 WebGPU 报错时，先确认网址来自开发者，并记下报错。更新浏览器后重启，确认硬件加速已开启；笔记本还需确认浏览器使用高性能显卡。',
        '若浏览器识别 WebGPU 但游戏仍无法启动，再检查图形驱动与设备支持。设置找不到或提示不变，就停止反复切换实验选项、安装扩展；改用受支持的浏览器或设备再试，不要下载第三方游戏文件。本站不托管游戏。'
      ] },
      { id: 'performance', title: '艾泽拉斯幸存者 卡顿、掉帧怎么处理', paragraphs: [
        '艾泽拉斯幸存者卡顿或掉帧时，先判断是整页迟缓，还是敌群多时短暂变慢。关闭占用资源的标签和后台程序，再在游戏 Options 降低 Render Scale，每次只改一项观察。',
        '笔记本检查高性能显卡；若页面提示玩家过多，这是游戏主机繁忙或请求受限，等待后再试，不要改图形设置。调整后仍卡顿，就停止多项试错，分清载入慢与性能不足。'
      ] },
      { id: 'loading', title: '艾泽拉斯幸存者 黑屏、一直加载不出来', paragraphs: [
        '艾泽拉斯幸存者黑屏或持续加载时，先确认网络正常，保持游戏页打开等待资源载入。仍停滞就重新载入，再从开发者网址打开；确认浏览器存储可用，隐私模式或严格存储可能影响缓存。',
        '仍无画面，检查 WebGPU 与图形设备，并按上两节排查。若普通网页也打不开，先处理网络；只有游戏黑屏时不要反复清缓存，以免误删站点数据。'
      ] },
      { id: 'save', title: '艾泽拉斯幸存者 存档不见了怎么找回', paragraphs: [
        '艾泽拉斯幸存者存档与浏览器站点数据及游戏网址绑定，换浏览器、设备或网址不会自动同步。先回原地址和浏览器查看进度，不要清除站点数据。',
        '迁移前在原环境从 Options > Saves 选择 Export Save 并备份。目标环境已有进度时也先导出，再用 Import Save 导入；导入可能覆盖目标存档，完成后先在游戏里核对。若原数据已清除且无备份，停止覆盖式尝试；本站无法恢复存档，操作需在开发者页面完成。'
      ] },
      { id: 'questions', title: '常见追问', lead: '艾泽拉斯幸存者的设备兼容与存档位置取决于游玩环境，先核对原地址和浏览器。', faq: [
        ['换了浏览器存档还在吗？', '通常不会自动同步。存档跟原浏览器和游戏网址有关；换之前先在原环境导出，再到目标环境用游戏内导入。'],
        ['手机能玩吗？', '能否启动取决于手机浏览器对 WebGPU 的支持和设备图形能力；若黑屏或报错，按上面的步骤排查，不能假设所有设备都支持。'],
        ['需要装模拟器吗？', '游戏通过开发者网页运行，不需要本站下载游戏或配置模拟器。能否运行取决于浏览器和设备支持，不要从第三方下载模拟器。'],
        ['清除缓存能找回存档吗？', '不能保证，清除网站数据可能移除原浏览器保存的进度。先回原网址确认；迁移前导出原存档，并先备份目标进度。']
      ] }
    ]
  },
});

const zhHomeSections = Object.fromEntries(fs.readFileSync('scripts/zh-cn-home.md', 'utf8').split(/^### /m).flatMap(block => {
  const match = block.match(/^section([1-5]) \| ([^\r\n]+)\r?\n([\s\S]*)/);
  if (!match) return [];
  const paragraphs = match[3].trim().split(/\r?\n\s*\r?\n/).map(text => {
    const heading = text.match(/^#### ([^\r\n]+)(?:\r?\n([\s\S]*))?$/);
    const paragraph = heading ? heading[2] : text;
    return `${heading ? `<h3>${heading[1]}</h3>` : ''}${paragraph ? `<p>${paragraph.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')}</p>` : ''}`;
  }).join('');
  return [[match[1], { title: match[2], paragraphs }]];
}));
const zhHomeSection = n => `<section class="section reading-section"><div class="shell"><h2>${zhHomeSections[n].title}</h2>${zhHomeSections[n].paragraphs}</div></section>`;

translations['de-de'].englishNote = 'Diese lokalisierten Seiten sind kompakte Zusammenfassungen; die ausführlichen Schritt-für-Schritt-Versionen gibt es auf Englisch.';
translations['fr-fr'].englishNote = 'Ces pages localisées sont des résumés pratiques ; les versions détaillées étape par étape sont en anglais.';
translations['ja-jp'].englishNote = '各ページは要点をまとめたローカライズ版です。詳しい手順を含む完全版は英語で読めます。';

const route = (locale, page = '') => `${origin}/${locale.slug === 'en-us' ? '' : `${locale.slug}/`}${page}`;
const countryNames = { US: 'United States', GB: 'United Kingdom', CA: 'Canada', AU: 'Australia' };
const alternates = (page = '', subset = locales) => subset.map(locale => `  <link rel="alternate" hreflang="${locale.code}" href="${route(locale, page)}">`).join('\n') + `\n  <link rel="alternate" hreflang="x-default" href="${route(locales[0], page)}">`;
const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const languageMenu = (current, page = '') => `<details class="language-menu"><summary aria-label="Choose language or region">${current.short} <span aria-hidden="true">⌄</span></summary><nav class="language-options" aria-label="Language and region">${locales.map(locale => `<a lang="${locale.code}" href="${route(locale, page)}"${locale.slug === current.slug ? ' aria-current="page"' : ''}>${locale.name}</a>`).join('')}</nav></details>`;

function localizedPage(locale, page) {
  const t = translations[locale.slug];
  const isGuide = page === 'guide/';
  const title = isGuide ? t.guideTitle : t.title;
  const description = isGuide ? t.guideDescription : t.description;
  const url = route(locale, page);
  const assetPrefix = isGuide && locale.slug === 'zh-cn' ? '/assets/' : isGuide ? '../../assets/' : '../assets/';
  const homeHref = isGuide ? locale.slug === 'zh-cn' ? '/zh-cn/' : '../' : './';
  const guideHref = isGuide ? locale.slug === 'zh-cn' ? '/zh-cn/guide/' : './' : 'guide/';
  const guideLabel = t.guidePageHeading || t.guideHeading;
  const cardHrefs = locale.slug === 'zh-cn' ? ['guide/first-run/', 'guide/progression/', 'guide/fixes/'] : ['guide/', 'guide/', 'guide/'];
  const guideCardLabel = locale.slug === 'zh-cn' ? t.readGuideLocal : t.readGuide;
  const guideQuick = n => t[`articleQuick${n}`] || t[`quick${n}`];
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': isGuide ? 'CollectionPage' : 'WebPage', name: title, description, inLanguage: locale.code, url },
    ...(!isGuide ? [{ '@type': 'FAQPage', mainEntity: [1, 2, 3, 4].map(n => ({ '@type': 'Question', name: t[`q${n}`], acceptedAnswer: { '@type': 'Answer', text: t[`a${n}`] } })) }] : []),
  ] });
  const head = `<!doctype html>
<html lang="${locale.code}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/hero.webp"><meta property="og:locale" content="${locale.code.replace('-', '_')}">
  <meta name="theme-color" content="#101915"><link rel="icon" href="${assetPrefix}favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${assetPrefix}style.css">
${alternates(page)}
  <script type="application/ld+json">${schema}</script>
</head>`;
  const header = `<header class="site-header locale-header"><div class="shell header-inner"><a class="brand" href="${homeHref}"><span class="brand-mark" aria-hidden="true">✦</span><span>AZEROTH <em>SURVIVORS</em><small>UNOFFICIAL FIELD GUIDE</small></span></a><nav class="nav locale-nav" aria-label="Main navigation"><a href="${homeHref}">${t.home}</a><a href="${homeHref}#about">${t.about}</a><a href="${guideHref}">${t.guides}</a><a href="${homeHref}#faq">${t.faq}</a></nav>${languageMenu(locale, page)}<a class="button button-small button-gold" href="https://wow.aethus.pl/" target="_blank" rel="noopener noreferrer">${t.play} ↗</a></div></header>`;
  const footerGuides = locale.slug === 'zh-cn' && isGuide
    ? '<a href="/zh-cn/guide/first-run/">艾泽拉斯幸存者 新手第一局怎么打</a><a href="/zh-cn/guide/progression/">艾泽拉斯幸存者 配装与区域推进</a><a href="/zh-cn/guide/fixes/">艾泽拉斯幸存者 卡顿与存档修复</a>'
    : locale.slug === 'zh-cn'
      ? '<a href="guide/first-run/">艾泽拉斯幸存者 新手第一局怎么打</a><a href="guide/progression/">艾泽拉斯幸存者 配装与区域推进</a><a href="guide/fixes/">艾泽拉斯幸存者 卡顿与存档修复</a>'
    : `<a href="${guideHref}">${guideLabel}</a><a href="https://azerothsurvivors.shop/guide/first-run/">${t.firstTitle} · EN</a><a href="https://azerothsurvivors.shop/guide/fixes/">${t.fixTitle} · EN</a>`;
  const footer = `<footer class="site-footer"><div class="shell footer-grid"><div><a class="brand" href="${homeHref}"><span class="brand-mark" aria-hidden="true">✦</span><span>AZEROTH <em>SURVIVORS</em><small>UNOFFICIAL FIELD GUIDE</small></span></a><p>Azeroth Survivors · ${t.guides}</p></div><div><h2>${t.guides}</h2>${footerGuides}</div><div><h2>Language / 地区</h2>${locales.map(item => `<a lang="${item.code}" href="${route(item, page)}">${item.name}</a>`).join('')}</div></div><div class="shell footer-bottom"><span>© 2026 Azeroth Survivors Guide</span></div></footer>`;
  const zhGuideBody = locale.slug === 'zh-cn' ? `<main id="main"><section class="guide-hero"><div class="shell"><p class="eyebrow">${t.guideKicker}</p><h1>${t.guideHero}</h1><p>${t.guideIndexLead}</p></div></section><section class="section reading-section"><div class="shell section-heading"><div><p class="eyebrow">${t.guides}</p><h2>${t.guideHeading}</h2></div></div><div class="shell reading-grid">${[t.firstTitle, t.buildTitle, t.fixTitle].map((title, i) => `<article class="reading-card"><span>0${i + 1} / ${title}</span><h3>${title}</h3><p>${[t.firstText, t.buildText, t.fixText][i]}</p><p>${[`${guideQuick(1)} ${guideQuick(2)} ${guideQuick(3)}`, t.buildTipText, t.quickFixText][i]}</p><a class="text-link" href="${['first-run/', 'progression/', 'fixes/'][i]}">${t.guideCardLabels[i]} →</a></article>`).join('')}</div></section></main>` : '';
  const body = isGuide
    ? locale.slug === 'zh-cn' ? zhGuideBody : `<main id="main"><section class="guide-hero"><div class="shell"><p class="eyebrow">${t.guideKicker}</p><h1>${t.guideHero}</h1><p>${t.guideLead}</p></div></section><section class="section reading-section"><div class="shell section-heading"><div><p class="eyebrow">${guideLabel}</p><h2>${t.quickTitle}</h2><p>${t.guideLead}</p></div></div><div class="shell reading-grid"><article class="reading-card"><span>01 / ${t.firstTitle}</span><h3>${t.firstTitle}</h3><p>${t.firstText}</p><p>${guideQuick(1)} ${guideQuick(2)} ${guideQuick(3)}</p><a class="text-link" href="https://azerothsurvivors.shop/guide/first-run/">${guideCardLabel} →</a></article><article class="reading-card"><span>02 / ${t.buildTitle}</span><h3>${t.buildTitle}</h3><p>${t.buildText}</p><p>${t.buildTipText}</p><a class="text-link" href="https://azerothsurvivors.shop/guide/progression/">${guideCardLabel} →</a></article><article class="reading-card"><span>03 / ${t.fixTitle}</span><h3>${t.fixTitle}</h3><p>${t.fixText}</p><p>${t.quickFixText}</p><a class="text-link" href="https://azerothsurvivors.shop/guide/fixes/">${guideCardLabel} →</a></article></div><div class="shell"><p class="locale-note">${t.englishNote}</p></div></section></main>`
    : `<main id="main"><section class="hero"><div class="hero-art" aria-hidden="true"></div><div class="shell hero-content"><p class="eyebrow">${t.kicker} <span class="line"></span></p><h1 id="hero-title">${t.hero}</h1><p class="hero-lede">${t.lead}</p><p class="hero-sub">${t.heroSub || t.overviewText}</p><div class="hero-actions"><a class="button button-gold" href="https://wow.aethus.pl/" target="_blank" rel="noopener noreferrer">${t.play} ↗</a><a class="button button-outline" href="guide/">${t.homeGuideAction || t.explore} →</a></div><p class="hero-note">${t.noAccount}<span>·</span>WebGPU</p></div><div class="shell hero-bottom"><span>AZEROTH SURVIVORS</span><span>${t.kicker}</span></div></section><section id="about" class="section intro-section"><div class="shell"><div class="intro-grid"><div><p class="eyebrow">${t.about}</p><h2>${t.overviewHeading || t.overview}</h2></div><div class="intro-copy"><p>${t.overviewText}</p><a class="text-link" href="guide/">${t.explore} ↗</a></div></div><div class="stat-row"><div><strong>09</strong><span>CLASSES</span></div><div><strong>12</strong><span>GUIDE ZONES</span></div><div><strong>03</strong><span>UPGRADES PER LEVEL</span></div><div><strong>16</strong><span>MIN · ELWYNN FINALE</span></div></div></div></section><section id="guides" class="section reading-section"><div class="shell section-heading"><div><p class="eyebrow">${t.guides}</p><h2>${t.guideHeading}</h2><p>${t.guideLead}</p></div></div><div class="shell reading-grid"><a class="reading-card" href="${cardHrefs[0]}"><span>01 / ${t.firstTitle}</span><h3>${t.firstTitle}</h3><p>${t.firstText}</p><b>${t.homeCardLabels?.[0] || t.explore} →</b></a><a class="reading-card" href="${cardHrefs[1]}"><span>02 / ${t.buildTitle}</span><h3>${t.buildTitle}</h3><p>${t.buildText}</p><b>${t.homeCardLabels?.[1] || t.explore} →</b></a><a class="reading-card" href="${cardHrefs[2]}"><span>03 / ${t.fixTitle}</span><h3>${t.fixTitle}</h3><p>${t.fixText}</p><b>${t.homeCardLabels?.[2] || t.explore} →</b></a></div></section><section class="section how-section"><div class="shell"><div class="section-heading"><div><p class="eyebrow">${t.quickTitle}</p><h2>${t.quickHeading || t.hero}</h2></div></div><div class="steps"><article><span>01</span><h3>${t.step1Title || t.firstTitle}</h3><p>${t.quick1}</p></article><article><span>02</span><h3>${t.step2Title || t.about}</h3><p>${t.quick2}</p></article><article><span>03</span><h3>${t.step3Title || t.guides}</h3><p>${t.quick3}</p></article><article><span>04</span><h3>${t.step4Title || t.faq}</h3><p>${t.quick4}</p></article></div></div></section><section id="faq" class="section faq-section"><div class="shell faq-grid"><div><p class="eyebrow">${t.faq}</p><h2>${t.faqTitle}</h2><p>${t.faqLead || t.guideLead}</p></div><div class="faq-list"><details><summary>${t.q1}</summary><p>${t.a1}</p></details><details><summary>${t.q2}</summary><p>${t.a2}</p></details><details><summary>${t.q3}</summary><p>${t.a3}</p></details><details><summary>${t.q4}</summary><p>${t.a4}</p></details></div></div></section></main>`;
  const pageBody = isGuide ? body.replaceAll('https://azerothsurvivors.shop/guide/first-run/', 'first-run/').replaceAll('https://azerothsurvivors.shop/guide/progression/', 'progression/').replaceAll('https://azerothsurvivors.shop/guide/fixes/', 'fixes/') : locale.slug === 'zh-cn' ? body.replace('</div></div><div class="stat-row">', `</div></div>${zhHomeSections[1].paragraphs}<div class="stat-row">`).replace('</article></div></div></section><section id="faq"', `</article></div>${zhHomeSections[2].paragraphs}</div></section>${[3, 4, 5].map(zhHomeSection).join('')}<section id="faq"`) : body;
  return `${head}\n<body><a class="skip-link" href="#main">Skip to content</a>${header}${pageBody}${footer}\n</body></html>`;
}

function localizedArticle(locale, page) {
  const t = translations[locale.slug];
  const quick = n => t[`articleQuick${n}`] || t[`quick${n}`];
  const slug = page.split('/').filter(Boolean).at(-1);
  const firstRun = slug === 'first-run';
  const progression = slug === 'progression';
  const chineseFirstRun = locale.slug === 'zh-cn' && firstRun;
  const chineseProgression = locale.slug === 'zh-cn' && progression;
  const chineseFix = locale.slug === 'zh-cn' && !firstRun && !progression;
  const localizedChineseArticle = chineseFirstRun ? t.firstRunArticle : chineseProgression ? t.progressionArticle : null;
  const fixArticle = t.fixArticle;
  const title = chineseFix ? fixArticle.title : localizedChineseArticle ? localizedChineseArticle.title : `Azeroth Survivors — ${firstRun ? t.firstTitle : progression ? t.buildTitle : t.fixTitle}`;
  const description = chineseFix ? fixArticle.description : localizedChineseArticle ? localizedChineseArticle.description : firstRun ? t.firstText : progression ? t.buildText : t.fixText;
  const articleHeading = chineseFix ? fixArticle.h1 : localizedChineseArticle ? localizedChineseArticle.h1 : title;
  const url = route(locale, page);
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: title, description, inLanguage: locale.code, mainEntityOfPage: url, publisher: { '@type': 'Organization', name: 'Azeroth Survivors Guide' } });
  const part = (id, heading, text) => `<section id="${id}">${locale.slug === 'zh-cn' ? '' : `<p class="eyebrow">${t.guideKicker}</p>`}<h2>${heading}</h2><p>${text}</p></section>`;
  let toc, body;
  if (localizedChineseArticle) {
    toc = localizedChineseArticle.sections.map(section => [section.title, section.id]);
    body = localizedChineseArticle.sections.map(section => `<section id="${section.id}"><h2>${section.title}</h2>${section.html}</section>`).join('');
  } else if (chineseFix) {
    const [diagnose, webgpu, performance, loading, save, questions] = fixArticle.sections;
    toc = fixArticle.sections.map(section => [section.title, section.id]);
    const rows = diagnose.rows.map(([symptom, cause, id, label]) => `<tr><td>${symptom}</td><td>${cause}</td><td><a href="#${id}">${label}</a></td></tr>`).join('');
    body = `<section id="${diagnose.id}"><h2>${diagnose.title}</h2><div class="guide-table-wrap"><table class="guide-table"><thead><tr><th>症状</th><th>最可能的原因</th><th>去下面的哪一节</th></tr></thead><tbody>${rows}</tbody></table></div><p>${diagnose.lead}</p></section>${[webgpu, performance, loading, save].map(section => `<section id="${section.id}"><h2>${section.title}</h2>${section.paragraphs.map(text => `<p>${text}</p>`).join('')}</section>`).join('')}<section id="${questions.id}"><h2>${questions.title}</h2><p>${questions.lead}</p><div class="faq-list">${questions.faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div></section>`;
  } else if (firstRun) {
    toc = [[t.quickTitle, 'quick'], [t.firstTitle, 'move'], [t.buildTitle, 'build'], [t.zoneTip, 'progress']];
    body = `<section id="quick">${locale.slug === 'zh-cn' ? '' : `<p class="eyebrow">${t.guideKicker}</p>`}<h2>${t.quickTitle}</h2><ol><li>${quick(1)}</li><li>${quick(2)}</li><li>${quick(3)}</li><li>${quick(4)}</li></ol></section>${part('move', t.firstTitle, `${t.firstText} ${quick(2)} ${quick(4)}`)}${part('build', t.buildTitle, `${t.buildText} ${t.buildTipText}`)}${part('progress', t.zoneTip, `${t.zoneTipText} ${t.a3}`)}`;
  } else if (progression) {
    toc = [[t.buildTitle, 'build'], [t.quickTitle, 'adapt'], [t.zoneTip, 'zones'], [t.faqTitle, 'save']];
    body = `${part('build', t.buildTitle, `${t.buildText} ${t.buildTipText}`)}${part('adapt', t.quickTitle, `${t.buildTipText} ${quick(4)}`)}<section id="zones">${locale.slug === 'zh-cn' ? '' : `<p class="eyebrow">${t.guideKicker}</p>`}<h2>${t.zoneTip}</h2><p>${t.zoneTipText}</p><ol><li>Elwynn Forest</li><li>Duskwood</li><li>Warsong Gulch</li><li>Un'Goro Crater</li><li>Arathi Basin</li><li>Feralas</li><li>Gurubashi Arena</li><li>Scarlet Monastery</li><li>Alterac Valley</li><li>Blackrock Mountain</li><li>Gates of Ahn'Qiraj</li><li>Naxxramas</li></ol></section>${part('save', t.faqTitle, t.a3)}`;
  } else {
    toc = [[t.quickFix, 'browser'], [t.fixTitle, 'performance'], [t.faqTitle, 'save'], [t.play, 'download']];
    body = `${part('browser', t.quickFix, `${t.quickFixText} ${t.a4}`)}${part('performance', t.fixTitle, t.fixText)}${part('save', t.faqTitle, `${t.a3}`)}<section id="download"><p class="eyebrow">${t.guideKicker}</p><h2>${t.play}</h2><p>Azeroth Survivors · ${t.guides}</p><a href="https://wow.aethus.pl/" target="_blank" rel="noopener noreferrer">${t.play} ↗</a></section>`;
  }
  const tocHtml = toc.map(([label, id]) => `<a href="#${id}">${label}</a>`).join('');
  const homeHref = locale.slug === 'zh-cn' ? '/zh-cn/' : '../../';
  const guideHref = locale.slug === 'zh-cn' ? '/zh-cn/guide/' : '../';
  const articleAssets = locale.slug === 'zh-cn' ? '/assets/' : '../../../assets/';
  const head = `<!doctype html><html lang="${locale.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${url}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/hero.webp"><meta property="og:locale" content="${locale.code.replace('-', '_')}"><meta name="theme-color" content="#101915"><link rel="icon" href="${articleAssets}favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${articleAssets}style.css">${alternates(page)}<script type="application/ld+json">${schema}</script></head>`;
  const header = `<header class="site-header locale-header"><div class="shell header-inner"><a class="brand" href="${homeHref}"><span class="brand-mark" aria-hidden="true">✦</span><span>AZEROTH <em>SURVIVORS</em><small>UNOFFICIAL FIELD GUIDE</small></span></a><nav class="nav locale-nav" aria-label="Main navigation"><a href="${homeHref}">${t.home}</a><a href="${homeHref}#about">${t.about}</a><a href="${guideHref}">${t.guides}</a><a href="${homeHref}#faq">${t.faq}</a></nav>${languageMenu(locale, page)}<a class="button button-small button-gold" href="https://wow.aethus.pl/" target="_blank" rel="noopener noreferrer">${t.play} ↗</a></div></header>`;
  const footerGuides = locale.slug === 'zh-cn'
    ? '<a href="/zh-cn/guide/first-run/">艾泽拉斯幸存者 新手第一局怎么打</a><a href="/zh-cn/guide/progression/">艾泽拉斯幸存者 配装与区域推进</a><a href="/zh-cn/guide/fixes/">艾泽拉斯幸存者 卡顿与存档修复</a>'
    : `<a href="${guideHref}">${t.guidePageHeading || t.guideHeading}</a><a href="https://azerothsurvivors.shop/${page}">${t.readGuide} · EN</a>`;
  const footer = `<footer class="site-footer"><div class="shell footer-grid"><div><p>Azeroth Survivors · ${t.guides}</p></div><div><h2>${t.guides}</h2>${footerGuides}</div><div><h2>Language / 地区</h2>${locales.map(item => `<a lang="${item.code}" href="${route(item, page)}">${item.name}</a>`).join('')}</div></div><div class="shell footer-bottom"><span>© 2026 Azeroth Survivors Guide</span></div></footer>`;
  const related = chineseFirstRun
    ? '<section class="sources"><a class="text-link" href="/zh-cn/guide/progression/">艾泽拉斯幸存者 配装与区域推进 →</a></section>'
    : chineseProgression
      ? '<section class="sources"><a class="text-link" href="/zh-cn/guide/first-run/">艾泽拉斯幸存者 新手第一局怎么打 →</a><br><a class="text-link" href="/zh-cn/guide/fixes/">艾泽拉斯幸存者 卡顿与存档修复 →</a></section>'
      : chineseFix
        ? '<section class="sources"><a class="text-link" href="/zh-cn/guide/first-run/">艾泽拉斯幸存者 新手第一局怎么打 →</a><br><a class="text-link" href="/zh-cn/guide/progression/">艾泽拉斯幸存者 配装与区域推进 →</a></section>'
        : locale.slug === 'zh-cn' ? `<section class="sources"><p>${t.englishNote}</p></section>` : `<section class="sources"><p>${t.englishNote}</p><a class="text-link" href="https://azerothsurvivors.shop/${page}">${t.readGuide} →</a></section>`;
  return `${head}<body><a class="skip-link" href="#main">Skip to content</a>${header}<main id="main"><section class="guide-hero"><div class="shell"><p class="eyebrow">${t.guideKicker}</p><h1>${esc(articleHeading)}</h1><p>${esc(description)}</p></div></section><div class="shell guide-layout"><nav class="guide-toc" aria-label="${t.guides}"><h2>${chineseFix || localizedChineseArticle ? (localizedChineseArticle?.tocTitle || fixArticle.tocTitle) : t.quickTitle}</h2>${tocHtml}</nav><article class="guide-content">${body}${related}</article></div></main>${footer}</body></html>`;
}

function addAlternates(html, page, localeSubset = locales) {
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g, '');
  html = html.replace(/\s*<meta property="og:locale" content="[^"]+">/g, '');
  const lang = html.match(/<html lang="([^"]+)"/)?.[1] || 'en-US';
  html = html.replace(/,"inLanguage":"[^"]+"/g, '');
  html = html.replace(/("@context":"https:\/\/schema\.org","@type":"[^"]+")/, `$1,"inLanguage":"${lang}"`);
  return html.replace('</head>', `  <meta property="og:locale" content="${lang.replace('-', '_')}">\n${alternates(page, localeSubset)}\n</head>`);
}

function addLanguageNav(html, current = locales[0], page = '') {
  html = html.replace(/<nav class="locale-switch"[\s\S]*?<\/nav>/g, '');
  return html.replace('</nav>', `</nav>${languageMenu(current, page)}`);
}

const pages = [
  { source: 'index.html', path: '', locales },
  { source: 'guide/index.html', path: 'guide/', locales },
  { source: 'guide/first-run/index.html', path: 'guide/first-run/', locales },
  { source: 'guide/progression/index.html', path: 'guide/progression/', locales },
  { source: 'guide/fixes/index.html', path: 'guide/fixes/', locales },
];

for (const page of pages) {
  const sourceFile = path.join(root, page.source);
  const original = fs.readFileSync(sourceFile, 'utf8').replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g, '').replace(/<nav class="locale-switch"[\s\S]*?<\/nav>/g, '').replace(/<details class="language-menu">[\s\S]*?<\/details>/g, '');
  const directoryLinks = html => html.replace(/href="([^"]*?)index\.html([^"]*)"/g, (_, target, suffix) => `href="${target || './'}${suffix}"`);
  const enPage = addAlternates(addLanguageNav(directoryLinks(original.replace(/<html lang="[^"]+">/, '<html lang="en-US">')), locales[0], page.path), page.path, page.locales);
  fs.writeFileSync(sourceFile, enPage);
  for (const locale of locales.slice(1, 4)) {
    const out = path.join(root, locale.slug, page.source);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    let html = original;
    const oldUrl = `${origin}/${page.path}`;
    html = html.replaceAll(oldUrl, route(locale, page.path));
    html = html.replace(/<html lang="[^"]+">/, `<html lang="${locale.code}">`);
    const depth = page.path.split('/').filter(Boolean).length;
    const sourceAssets = `${'../'.repeat(depth)}assets/`;
    const copiedAssets = `${'../'.repeat(depth + 1)}assets/`;
    html = html.replaceAll(`="${sourceAssets}`, `="${copiedAssets}`);
    html = html.replace(/<title>(.*?)<\/title>/, `<title>$1 | ${countryNames[locale.country]}</title>`);
    html = html.replace(/<meta name="description" content="([^"]*)">/, `<meta name="description" content="$1 ${countryNames[locale.country]} edition.">`);
    html = addAlternates(addLanguageNav(html, locale, page.path), page.path, page.locales);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, directoryLinks(html));
  }
}

for (const locale of locales.slice(4)) {
  for (const page of ['', 'guide/', 'guide/first-run/', 'guide/progression/', 'guide/fixes/']) {
    const out = path.join(root, locale.slug, page, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    let html = page.startsWith('guide/') && page !== 'guide/' ? localizedArticle(locale, page) : localizedPage(locale, page);
    if (page === '' && locale.slug !== 'zh-cn') html = html.replace('</main>', `<section class="section reading-section"><div class="shell section-heading"><div><p class="eyebrow">${translations[locale.slug].moreGuidesLabel || translations[locale.slug].guides}</p><h2>More English guides</h2><p>${translations[locale.slug].englishNote}</p></div></div><div class="shell reading-grid"><a class="reading-card" href="/classes/"><span>CLASS GUIDE · EN</span><h3>Compare all nine classes</h3><p>Reported play styles, trade-offs, and beginner considerations.</p><b>Explore class choices →</b></a><a class="reading-card" href="/guide/save-transfer/"><span>SAVE GUIDE · EN</span><h3>Back up or move a save</h3><p>Export and import steps with a warning before overwriting destination progress.</p><b>Read the save guide →</b></a></div></section></main>`);
    fs.writeFileSync(out, html);
  }
}

const sitemapRows = [];
const additionalSitemapPages = ['classes/', 'guide/save-transfer/', ...fieldGuideRoutes.filter(Boolean)];
for (const page of pages) {
  const subset = page.locales;
  for (const locale of subset) sitemapRows.push({ url: route(locale, page.path), page: page.path, alternates: subset });
}
for (const page of additionalSitemapPages) sitemapRows.push({ url: `${origin}/${page}`, page, alternates: [locales[0]] });
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapRows.map(row => `  <url>\n    <loc>${row.url}</loc>\n${[...row.alternates.map(locale => `    <xhtml:link rel="alternate" hreflang="${locale.code}" href="${route(locale, row.page)}"/>`), `    <xhtml:link rel="alternate" hreflang="x-default" href="${route(locales[0], row.page)}"/>`].join('\n')}\n  </url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);

const htmlFiles = [];
function collectHtml(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) collectHtml(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
collectHtml(root);
const adLink = 'https://araplhn.org/4/b04d973c362261149ebfae2e088bd3bf';
const adsense = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3292171179082273" crossorigin="anonymous"></script>';
const bauvalAdUnit = `<!-- bauval-ad:start --><div class="shell footer-ad-unit"><script async="async" data-cfasync="false" src="https://bauval.org/21/8c4d536502ccd29d9ac601dfe65b98fd"></script><div id="container-8c4d536502ccd29d9ac601dfe65b98fd"></div></div><!-- bauval-ad:end -->`;
const adCopy = {
  en: ['Sponsored link', 'View offer ↗'],
  de: ['Gesponserter Link', 'Angebot ansehen ↗'],
  fr: ['Lien sponsorisé', 'Voir l’offre ↗'],
  ja: ['広告リンク', '広告を見る ↗'],
  zh: ['赞助链接', '查看推荐 ↗'],
};
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<nav class="shell footer-trust"[\s\S]*?<\/nav>/g, '');
  html = html.replace('<div class="shell footer-bottom">', trustLinks + '<div class="shell footer-bottom">');
  html = html.replace(/<div class="shell footer-legal">[\s\S]*?<\/div>/g, '');
  const locale = path.relative(root, file).split(path.sep)[0];
  const notice = footerLegal[locale] || footerLegal.en;
  const legalSection = `<div class="shell footer-legal"><h2>${notice.heading}</h2><p>${notice.text}</p></div>`;
  html = html.replace(/(<div class="shell footer-bottom"><span>[^<]*<\/span>)<span>[^<]*<\/span>/, '$1');
  html = html.replace('<div class="shell footer-bottom">', `${legalSection}<div class="shell footer-bottom">`);
  if (!html.includes('name="google-site-verification"')) {
    html = html.replace('</head>', '  <meta name="google-site-verification" content="l-io4uzFsuhl0rYud79Yvs1fm0TrrT7Y5qHSwEAJjzA">\n</head>');
  }
  html = html.replaceAll('G-934PZQ8JZ2', 'G-9DEW1GPD8P');
  if (!html.includes('G-9DEW1GPD8P')) {
    html = html.replace('</head>', '  <script async src="https://www.googletagmanager.com/gtag/js?id=G-9DEW1GPD8P"></script>\n  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-9DEW1GPD8P");</script>\n</head>');
  }
  html = html.replace(/<!-- bauval-ad:start -->[\s\S]*?<!-- bauval-ad:end -->/g, '');
  html = html.replace(/<div class="shell footer-ad">[\s\S]*?<\/div>/g, '');
  const language = html.match(/<html lang="([^"]+)"/)?.[1]?.slice(0, 2).toLowerCase() || 'en';
  const [label, linkText] = adCopy[language] || adCopy.en;
  const section = `<div class="shell footer-ad"><span>${label}</span><a href="${adLink}" target="_blank" rel="sponsored nofollow noopener noreferrer">${linkText}</a></div>`;
  html = html.replace('<div class="shell footer-bottom">', `${section}<div class="shell footer-bottom">`);
  html = html.replace('<div class="shell footer-bottom">', bauvalAdUnit + '<div class="shell footer-bottom">');
  if (!html.includes('client=ca-pub-3292171179082273')) html = html.replace('</head>', '  ' + adsense + '\n</head>');
  fs.writeFileSync(file, html);
}
const urlsToFiles = new Map();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!canonical || !/<title>[^<]+<\/title>/i.test(html) || !/<meta name="description" content="[^"]+"/i.test(html) || !/<h1\b[\s\S]*?<\/h1>/i.test(html)) throw new Error(`Missing SEO metadata or H1: ${path.relative(root, file)}`);
  if ((html.match(/class="shell footer-legal"/g) || []).length !== 1) throw new Error(`Expected one fan guide disclosure: ${path.relative(root, file)}`);
  if ((html.match(/class="shell footer-trust"/g) || []).length !== 1) throw new Error(`Expected one trust navigation: ${path.relative(root, file)}`);
  if (html.split('client=ca-pub-3292171179082273').length - 1 !== 1) throw new Error(`Expected one AdSense loader: ${path.relative(root, file)}`);
  if (html.split('https://bauval.org/21/8c4d536502ccd29d9ac601dfe65b98fd').length - 1 !== 1 || html.split('id="container-8c4d536502ccd29d9ac601dfe65b98fd"').length - 1 !== 1) throw new Error(`Expected one Bauval ad unit: ${path.relative(root, file)}`);
  if (urlsToFiles.has(canonical)) throw new Error(`Duplicate canonical URL: ${canonical}`);
  urlsToFiles.set(canonical, file);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#|javascript:)/i.test(value)) continue;
    const target = value.split('#')[0].split('?')[0];
    if (!target) continue;
    const resolved = path.resolve(target.startsWith('/') ? root : path.dirname(file), decodeURIComponent(target.replace(/^\//, '')));
    if (!fs.existsSync(resolved)) throw new Error(`Missing local target in ${path.relative(root, file)}: ${value}`);
  }
}
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const currentCode = html.match(/<html lang="([^"]+)"/)?.[1];
  for (const match of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    const [, code, href] = match;
    const targetFile = urlsToFiles.get(href);
    if (!targetFile) throw new Error(`hreflang target missing from sitemap/pages: ${href}`);
    const targetHtml = fs.readFileSync(targetFile, 'utf8');
    if (!targetHtml.includes(`hreflang="${currentCode}" href="${html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]}"`) && code !== 'x-default') throw new Error(`hreflang is not reciprocal: ${path.relative(root, file)} -> ${href}`);
  }
}
if ((sitemap.match(/<url>/g) || []).length !== sitemapRows.length) throw new Error('Sitemap URL count does not match generated routes.');
console.log(`Generated and checked ${htmlFiles.length} pages, ${sitemapRows.length} canonical URLs, and ${locales.length} locale variants.`);
fixLinks(root);
