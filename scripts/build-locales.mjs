import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const origin = 'https://azerothsurvivors.shop';
const footerLegal = {
  en: {
    heading: 'About this fan guide',
    text: 'Azeroth Survivors is a free fan game created by Aethus. This independent guide is not affiliated with or endorsed by Aethus or Blizzard Entertainment. World of Warcraft is a trademark of Blizzard Entertainment. We do not host or distribute the game or its files.',
  },
  'de-de': {
    heading: 'Über diesen Fan-Guide',
    text: 'Azeroth Survivors ist ein kostenloses Fan-Spiel von Aethus. Dieser unabhängige Guide ist weder mit Aethus noch mit Blizzard Entertainment verbunden oder von ihnen unterstützt. World of Warcraft ist eine Marke von Blizzard Entertainment. Wir hosten oder verbreiten weder das Spiel noch seine Dateien.',
  },
  'fr-fr': {
    heading: 'À propos de ce guide de fans',
    text: 'Azeroth Survivors est un jeu de fans gratuit créé par Aethus. Ce guide indépendant n’est ni affilié à Aethus ou Blizzard Entertainment, ni approuvé par eux. World of Warcraft est une marque de Blizzard Entertainment. Nous n’hébergeons ni ne distribuons le jeu ou ses fichiers.',
  },
  'ja-jp': {
    heading: 'このファンガイドについて',
    text: 'Azeroth SurvivorsはAethusが制作した無料のファンゲームです。この独立したガイドはAethusおよびBlizzard Entertainmentとは無関係で、承認も受けていません。World of WarcraftはBlizzard Entertainmentの商標です。当サイトはゲームやそのファイルをホストまたは配布していません。',
  },
  'zh-cn': {
    heading: '关于本粉丝指南',
    text: 'Azeroth Survivors 是由 Aethus 制作的免费粉丝游戏。本网站是独立攻略指南，与 Aethus 或暴雪娱乐无关联，也未获得其认可。《魔兽世界》是暴雪娱乐的商标。本网站不托管或分发游戏及其文件。',
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
    title: 'Azeroth Survivors 攻略指南｜新手、配装与问题修复', description: 'Azeroth Survivors 实用攻略：新手首局、职业与配装、区域推进，以及 WebGPU、卡顿和存档问题的解决方法。', guideTitle: 'Azeroth Survivors 攻略：配装、区域推进与故障排查', guideDescription: '独立玩家指南，涵盖新手首局、构筑思路、区域进度和常见浏览器问题。',
    home: '首页', guides: '攻略', about: '游戏简介', faq: '常见问题', play: '前往游戏', kicker: '独立玩家指南', hero: '在一波波敌人中<span>活下来</span>', lead: '一款以艾泽拉斯为背景的浏览器生存肉鸽游戏。技能会自动攻击，走位和升级选择决定你能走多远。', explore: '查看攻略', noAccount: '免费 · 无需账号', overview: '快速了解 Azeroth Survivors', overviewText: '选择种族、职业和区域，在移动中收集经验，并根据敌人调整构筑。游戏由开发者 Aethus 托管，点击后会前往其官方网站。', guideHeading: '关键时刻的实用攻略', guideLead: '从第一局到配装思路，再到浏览器和存档故障的处理办法。', firstTitle: '新手第一局', firstText: '掌握走位、收集经验、选择升级卡，并为首领战预留空间。', buildTitle: '配装与区域推进', buildText: '围绕核心技能强化，补足短板，逐步解锁新区域。', fixTitle: 'WebGPU、卡顿与存档', fixText: '判断问题原因，逐项检查浏览器、显卡和存档位置。', readGuide: '阅读英文详细攻略', quickTitle: '快速开始', quick1: '选择职业，从第一个区域「艾尔文森林」开始。', quick2: '用 WASD 或方向键移动；技能会自动攻击。', quick3: '拾取经验，升级时从卡牌中选择一项强化。', quick4: '首领出现前移向开阔地带，并留好撤退路线。', faqTitle: '常见问题', q1: 'Azeroth Survivors 是暴雪官方游戏吗？', a1: '不是。这是 Aethus 制作的粉丝项目。本网站也是独立攻略站，与暴雪无关。', q2: '需要按键攻击吗？', a2: '不需要，技能会自动攻击。玩家主要负责移动、躲避敌人和选择升级。', q3: '为什么我的存档不见了？', a3: '存档与使用的浏览器及游戏网址有关。请回到最初游玩的游戏页面，并在更换浏览器或设备前导出存档。', q4: '提示「不支持 WebGPU」怎么办？', a4: '更新浏览器，开启硬件加速后重启。笔记本电脑还要确认浏览器使用的是高性能显卡。', disclaimer: '本站为独立玩家指南，不托管游戏或游戏文件，与 Aethus 或暴雪娱乐无关。', guideKicker: 'AZEROTH SURVIVORS · 攻略资料库', guideHero: '实战技巧与<span>问题解决</span>', guideLead: '先掌握基础玩法，再按问题查找对应的解决方法。', quickFix: '常见问题速查', quickFixText: '没有 WebGPU：更新浏览器并检查硬件加速。画面卡顿：降低游戏渲染比例并关闭占用资源的后台程序。存档不见：回到最初游玩的游戏网址导出存档，再导入新设备。', buildTip: '配装建议', buildTipText: '先确定一个核心输出技能，再集中强化。首领前容易倒下，就选防御卡；小怪越积越多，就优先范围伤害或增加攻击目标。', zoneTip: '推进建议', zoneTipText: '区域进度按职业分别记录。如果新区域太难，回到已通关区域继续积累该职业经验。', englishNote: '更详细的分步文章目前提供英文版。',
  },
};

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
  const assetPrefix = isGuide ? '../../assets/' : '../assets/';
  const homeHref = isGuide ? '../index.html' : 'index.html';
  const guideHref = isGuide ? 'index.html' : 'guide/index.html';
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
  const footer = `<footer class="site-footer"><div class="shell footer-grid"><div><a class="brand" href="${homeHref}"><span class="brand-mark" aria-hidden="true">✦</span><span>AZEROTH <em>SURVIVORS</em><small>UNOFFICIAL FIELD GUIDE</small></span></a><p>${t.disclaimer}</p></div><div><h2>${t.guides}</h2><a href="${guideHref}">${t.guideHeading}</a><a href="https://azerothsurvivors.shop/guide/first-run/">${t.firstTitle} · EN</a><a href="https://azerothsurvivors.shop/guide/fixes/">${t.fixTitle} · EN</a></div><div><h2>Language / 地区</h2>${locales.map(item => `<a lang="${item.code}" href="${route(item, page)}">${item.name}</a>`).join('')}</div></div><div class="shell footer-bottom"><span>© 2026 Azeroth Survivors Guide</span><span>${t.disclaimer}</span></div></footer>`;
  const body = isGuide
    ? `<main id="main"><section class="guide-hero"><div class="shell"><p class="eyebrow">${t.guideKicker}</p><h1>${t.guideHero}</h1><p>${t.guideLead}</p></div></section><section class="section reading-section"><div class="shell section-heading"><div><p class="eyebrow">${t.guideHeading}</p><h2>${t.quickTitle}</h2><p>${t.guideLead}</p></div></div><div class="shell reading-grid"><article class="reading-card"><span>01 / ${t.firstTitle}</span><h3>${t.firstTitle}</h3><p>${t.firstText}</p><p>${t.quick1} ${t.quick2} ${t.quick3}</p><a class="text-link" href="https://azerothsurvivors.shop/guide/first-run/">${t.readGuide} →</a></article><article class="reading-card"><span>02 / ${t.buildTitle}</span><h3>${t.buildTitle}</h3><p>${t.buildText}</p><p>${t.buildTipText}</p><a class="text-link" href="https://azerothsurvivors.shop/guide/progression/">${t.readGuide} →</a></article><article class="reading-card"><span>03 / ${t.fixTitle}</span><h3>${t.fixTitle}</h3><p>${t.fixText}</p><p>${t.quickFixText}</p><a class="text-link" href="https://azerothsurvivors.shop/guide/fixes/">${t.readGuide} →</a></article></div><div class="shell"><p class="locale-note">${t.englishNote}</p></div></section></main>`
    : `<main id="main"><section class="hero"><div class="hero-art" aria-hidden="true"></div><div class="shell hero-content"><p class="eyebrow">${t.kicker} <span class="line"></span></p><h1 id="hero-title">${t.hero}</h1><p class="hero-lede">${t.lead}</p><p class="hero-sub">${t.overviewText}</p><div class="hero-actions"><a class="button button-gold" href="https://wow.aethus.pl/" target="_blank" rel="noopener noreferrer">${t.play} ↗</a><a class="button button-outline" href="guide/index.html">${t.explore} →</a></div><p class="hero-note">${t.noAccount}<span>·</span>WebGPU</p></div><div class="shell hero-bottom"><span>AZEROTH SURVIVORS</span><span>${t.kicker}</span></div></section><section id="about" class="section intro-section"><div class="shell"><div class="intro-grid"><div><p class="eyebrow">${t.about}</p><h2>${t.overview}</h2></div><div class="intro-copy"><p>${t.overviewText}</p><a class="text-link" href="guide/index.html">${t.explore} ↗</a></div></div><div class="stat-row"><div><strong>09</strong><span>CLASSES</span></div><div><strong>12</strong><span>GUIDE ZONES</span></div><div><strong>03</strong><span>UPGRADES PER LEVEL</span></div><div><strong>16</strong><span>MIN · ELWYNN FINALE</span></div></div></div></section><section id="guides" class="section reading-section"><div class="shell section-heading"><div><p class="eyebrow">${t.guides}</p><h2>${t.guideHeading}</h2><p>${t.guideLead}</p></div></div><div class="shell reading-grid"><a class="reading-card" href="guide/index.html"><span>01 / ${t.firstTitle}</span><h3>${t.firstTitle}</h3><p>${t.firstText}</p><b>${t.explore} →</b></a><a class="reading-card" href="guide/index.html"><span>02 / ${t.buildTitle}</span><h3>${t.buildTitle}</h3><p>${t.buildText}</p><b>${t.explore} →</b></a><a class="reading-card" href="guide/index.html"><span>03 / ${t.fixTitle}</span><h3>${t.fixTitle}</h3><p>${t.fixText}</p><b>${t.explore} →</b></a></div></section><section class="section how-section"><div class="shell"><div class="section-heading"><div><p class="eyebrow">${t.quickTitle}</p><h2>${t.hero}</h2></div></div><div class="steps"><article><span>01</span><h3>${t.firstTitle}</h3><p>${t.quick1}</p></article><article><span>02</span><h3>${t.about}</h3><p>${t.quick2}</p></article><article><span>03</span><h3>${t.guides}</h3><p>${t.quick3}</p></article><article><span>04</span><h3>${t.faq}</h3><p>${t.quick4}</p></article></div></div></section><section id="faq" class="section faq-section"><div class="shell faq-grid"><div><p class="eyebrow">${t.faq}</p><h2>${t.faqTitle}</h2><p>${t.guideLead}</p></div><div class="faq-list"><details><summary>${t.q1}</summary><p>${t.a1}</p></details><details><summary>${t.q2}</summary><p>${t.a2}</p></details><details><summary>${t.q3}</summary><p>${t.a3}</p></details><details><summary>${t.q4}</summary><p>${t.a4}</p></details></div></div></section></main>`;
  const pageBody = isGuide ? body.replaceAll('https://azerothsurvivors.shop/guide/first-run/', 'first-run/index.html').replaceAll('https://azerothsurvivors.shop/guide/progression/', 'progression/index.html').replaceAll('https://azerothsurvivors.shop/guide/fixes/', 'fixes/index.html') : body;
  return `${head}\n<body><a class="skip-link" href="#main">Skip to content</a>${header}${pageBody}${footer}\n</body></html>`;
}

function localizedArticle(locale, page) {
  const t = translations[locale.slug];
  const slug = page.split('/').filter(Boolean).at(-1);
  const firstRun = slug === 'first-run';
  const progression = slug === 'progression';
  const title = `Azeroth Survivors — ${firstRun ? t.firstTitle : progression ? t.buildTitle : t.fixTitle}`;
  const description = firstRun ? t.firstText : progression ? t.buildText : t.fixText;
  const url = route(locale, page);
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: title, description, inLanguage: locale.code, mainEntityOfPage: url, publisher: { '@type': 'Organization', name: 'Azeroth Survivors Guide' } });
  const part = (id, heading, text) => `<section id="${id}"><p class="eyebrow">${t.guideKicker}</p><h2>${heading}</h2><p>${text}</p></section>`;
  let toc, body;
  if (firstRun) {
    toc = [[t.quickTitle, 'quick'], [t.firstTitle, 'move'], [t.buildTitle, 'build'], [t.zoneTip, 'progress']];
    body = `<section id="quick"><p class="eyebrow">${t.guideKicker}</p><h2>${t.quickTitle}</h2><ol><li>${t.quick1}</li><li>${t.quick2}</li><li>${t.quick3}</li><li>${t.quick4}</li></ol></section>${part('move', t.firstTitle, `${t.firstText} ${t.quick2} ${t.quick4}`)}${part('build', t.buildTitle, `${t.buildText} ${t.buildTipText}`)}${part('progress', t.zoneTip, `${t.zoneTipText} ${t.a3}`)}`;
  } else if (progression) {
    toc = [[t.buildTitle, 'build'], [t.quickTitle, 'adapt'], [t.zoneTip, 'zones'], [t.faqTitle, 'save']];
    body = `${part('build', t.buildTitle, `${t.buildText} ${t.buildTipText}`)}${part('adapt', t.quickTitle, `${t.buildTipText} ${t.quick4}`)}<section id="zones"><p class="eyebrow">${t.guideKicker}</p><h2>${t.zoneTip}</h2><p>${t.zoneTipText}</p><ol><li>Elwynn Forest</li><li>Duskwood</li><li>Warsong Gulch</li><li>Un'Goro Crater</li><li>Arathi Basin</li><li>Feralas</li><li>Gurubashi Arena</li><li>Scarlet Monastery</li><li>Alterac Valley</li><li>Blackrock Mountain</li><li>Gates of Ahn'Qiraj</li><li>Naxxramas</li></ol></section>${part('save', t.faqTitle, t.a3)}`;
  } else {
    toc = [[t.quickFix, 'browser'], [t.fixTitle, 'performance'], [t.faqTitle, 'save'], [t.play, 'download']];
    body = `${part('browser', t.quickFix, `${t.quickFixText} ${t.a4}`)}${part('performance', t.fixTitle, t.fixText)}${part('save', t.faqTitle, `${t.a3} ${t.disclaimer}`)}<section id="download"><p class="eyebrow">${t.guideKicker}</p><h2>${t.play}</h2><p>${t.disclaimer}</p><a href="https://wow.aethus.pl/" target="_blank" rel="noopener noreferrer">${t.play} ↗</a></section>`;
  }
  const tocHtml = toc.map(([label, id]) => `<a href="#${id}">${label}</a>`).join('');
  const homeHref = '../../index.html';
  const guideHref = '../index.html';
  const head = `<!doctype html><html lang="${locale.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${url}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/hero.webp"><meta property="og:locale" content="${locale.code.replace('-', '_')}"><meta name="theme-color" content="#101915"><link rel="icon" href="../../../assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="../../../assets/style.css">${alternates(page)}<script type="application/ld+json">${schema}</script></head>`;
  const header = `<header class="site-header locale-header"><div class="shell header-inner"><a class="brand" href="${homeHref}"><span class="brand-mark" aria-hidden="true">✦</span><span>AZEROTH <em>SURVIVORS</em><small>UNOFFICIAL FIELD GUIDE</small></span></a><nav class="nav locale-nav" aria-label="Main navigation"><a href="${homeHref}">${t.home}</a><a href="${homeHref}#about">${t.about}</a><a href="${guideHref}">${t.guides}</a><a href="${homeHref}#faq">${t.faq}</a></nav>${languageMenu(locale, page)}<a class="button button-small button-gold" href="https://wow.aethus.pl/" target="_blank" rel="noopener noreferrer">${t.play} ↗</a></div></header>`;
  const footer = `<footer class="site-footer"><div class="shell footer-grid"><div><p>${t.disclaimer}</p></div><div><h2>${t.guides}</h2><a href="${guideHref}">${t.guideHeading}</a><a href="https://azerothsurvivors.shop/${page}">${t.readGuide} · EN</a></div><div><h2>Language / 地区</h2>${locales.map(item => `<a lang="${item.code}" href="${route(item, page)}">${item.name}</a>`).join('')}</div></div><div class="shell footer-bottom"><span>© 2026 Azeroth Survivors Guide</span><span>${t.disclaimer}</span></div></footer>`;
  return `${head}<body><a class="skip-link" href="#main">Skip to content</a>${header}<main id="main"><section class="guide-hero"><div class="shell"><p class="eyebrow">${t.guideKicker}</p><h1>${esc(title)}</h1><p>${esc(description)}</p></div></section><div class="shell guide-layout"><nav class="guide-toc" aria-label="${t.guides}"><h2>${t.quickTitle}</h2>${tocHtml}</nav><article class="guide-content">${body}<section class="sources"><p>${t.englishNote}</p><a class="text-link" href="https://azerothsurvivors.shop/${page}">${t.readGuide} →</a></section></article></div></main>${footer}</body></html>`;
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
  const enPage = addAlternates(addLanguageNav(original.replace(/<html lang="[^"]+">/, '<html lang="en-US">'), locales[0], page.path), page.path, page.locales);
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
    html = html.replaceAll(sourceAssets, copiedAssets);
    html = html.replace(/<title>(.*?)<\/title>/, `<title>$1 | ${countryNames[locale.country]}</title>`);
    html = html.replace(/<meta name="description" content="([^"]*)">/, `<meta name="description" content="$1 ${countryNames[locale.country]} edition.">`);
    html = addAlternates(addLanguageNav(html, locale, page.path), page.path, page.locales);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  }
}

for (const locale of locales.slice(4)) {
  for (const page of ['', 'guide/', 'guide/first-run/', 'guide/progression/', 'guide/fixes/']) {
    const out = path.join(root, locale.slug, page, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page.startsWith('guide/') && page !== 'guide/' ? localizedArticle(locale, page) : localizedPage(locale, page));
  }
}

const sitemapRows = [];
for (const page of pages) {
  const subset = page.locales;
  for (const locale of subset) sitemapRows.push({ url: route(locale, page.path), page: page.path, alternates: subset });
}
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
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('class="footer-legal"')) continue;
  const locale = path.relative(root, file).split(path.sep)[0];
  const notice = footerLegal[locale] || footerLegal.en;
  const section = `<div class="shell footer-legal"><h2>${notice.heading}</h2><p>${notice.text}</p></div>`;
  html = html.replace('<div class="shell footer-bottom">', `${section}<div class="shell footer-bottom">`);
  fs.writeFileSync(file, html);
}
const urlsToFiles = new Map();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!canonical || !/<title>[^<]+<\/title>/i.test(html) || !/<meta name="description" content="[^"]+"/i.test(html) || !/<h1\b[\s\S]*?<\/h1>/i.test(html)) throw new Error(`Missing SEO metadata or H1: ${path.relative(root, file)}`);
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
