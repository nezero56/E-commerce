// Curated Unsplash photo IDs matched to product categories.
// Direct image URLs work without an API key.
const KEYWORD_PHOTOS = {
  watch: [
    'photo-1523275335684-37898b6baf30',
    'photo-1546868871-7041f2a55e12',
    'photo-1587836374828-4dbafa94cf0e',
    'photo-1614164185128-e4ec99c436d7',
  ],
  sneakers: [
    'photo-1542291026-7eec264c27ff',
    'photo-1600185365483-26d7a4cc7519',
    'photo-1595950653106-6c9ebd614d3a',
    'photo-1491553895911-0055eca6402d',
  ],
  dress: [
    'photo-1572804013309-59a88b7e92f1',
    'photo-1496747611176-843222e1e57c',
    'photo-1515886657613-9f3515b0c78f',
    'photo-1539109136881-3be0616acf4b',
  ],
  jacket: [
    'photo-1551028719-00167b16eac5',
    'photo-1591047139829-d91aecb6caea',
    'photo-1548126032-079a0fb0099d',
    'photo-1611312449408-fcece27cdbb7',
  ],
  jeans: [
    'photo-1542272604-787c3835535d',
    'photo-1475178626620-a4d074967452',
    'photo-1555689502-c4b22d76c56f',
    'photo-1604176354204-9268737828e4',
  ],
  tshirt: [
    'photo-1521572163474-6864f9cf17ab',
    'photo-1583743814966-8936f5b7be1a',
    'photo-1576566588028-4147f3842f27',
    'photo-1503341504253-dff4815485f1',
  ],
  shirt: [
    'photo-1596755094514-f87e34085b2c',
    'photo-1602810318383-e386cc2a3ccf',
    'photo-1620799140408-edc6dcb6d633',
    'photo-1563630423918-b58f07336ac9',
  ],
  handbag: [
    'photo-1548036328-c9fa89d128fa',
    'photo-1584917865442-de89df76afd3',
    'photo-1566150905458-1bf1fc113f0d',
    'photo-1590874103328-eac38a683ce7',
  ],
  backpack: [
    'photo-1553062407-98eeb64c6a62',
    'photo-1622560480605-d83c853bc5c3',
    'photo-1491637639811-60e2756cc1c7',
    'photo-1581605405669-fcdf81165afa',
  ],
  shoes: [
    'photo-1542291026-7eec264c27ff',
    'photo-1560769629-975ec94e6a86',
    'photo-1543163521-1bf539c55dd2',
    'photo-1518894781321-630e638d0742',
  ],
  hat: [
    'photo-1521369909029-2afed882baee',
    'photo-1588850561407-ed78c282e89b',
    'photo-1556306535-0f09a537f0a3',
    'photo-1576871337622-98d48d1cf531',
  ],
  scarf: [
    'photo-1520903920243-00d872a2d1c9',
    'photo-1601924994987-69e26d50dc26',
    'photo-1607082348824-0a96f2a4b9da',
  ],
  sweater: [
    'photo-1434389677669-e08b4cac3105',
    'photo-1576566588028-4147f3842f27',
    'photo-1620799140408-edc6dcb6d633',
  ],
  suit: [
    'photo-1507679799987-c73779587ccf',
    'photo-1593030761757-71fae45fa0e7',
    'photo-1617127365659-c47fa864d8bc',
  ],
  jewelry: [
    'photo-1515562141207-7a88fb7ce338',
    'photo-1599643478518-a784e5dc4c8f',
    'photo-1573408301185-9519f94816b5',
    'photo-1611591437281-460bfbe1220a',
  ],
  sunglasses: [
    'photo-1511499767150-a48a237f0083',
    'photo-1572635196237-14b3f281503f',
    'photo-1508296695146-257a814070b4',
  ],
  laptop: [
    'photo-1496181133206-80ce9b88a853',
    'photo-1517336714731-489689fd1ca8',
    'photo-1593642632559-0c6d3fc62b89',
  ],
  smartphone: [
    'photo-1511707171634-5f897ff02aa9',
    'photo-1592899677977-9c10ca588bbd',
    'photo-1580910051074-3eb694886505',
  ],
  headphones: [
    'photo-1505740420928-5e560c06d30e',
    'photo-1484704849700-f032a568e944',
    'photo-1546435770-a3e426bf472b',
  ],
  camera: [
    'photo-1516035069371-29a1b244cc32',
    'photo-1502920917128-1aa500764cbd',
    'photo-1495707902641-75cac588d2e9',
  ],
  speaker: [
    'photo-1608043152269-423dbba4e7e1',
    'photo-1545454675-3531b543be5d',
  ],
  perfume: [
    'photo-1541643600914-78b084683702',
    'photo-1592945403244-b3fbafd7f539',
    'photo-1588776814546-1ffcf47267a5',
  ],
  belt: [
    'photo-1553062407-98eeb64c6a62',
    'photo-1624378439575-d8705ad7ae80',
  ],
  wallet: [
    'photo-1627123424574-724758594785',
    'photo-1601597111158-2fceff292cdc',
  ],
  fitness: [
    'photo-1517836357463-d25dfeac3438',
    'photo-1534438327276-14e5300c3a48',
    'photo-1571019613454-1cb2f99b2d8b',
  ],
  fashion: [
    'photo-1483985988355-763728e1935b',
    'photo-1469334031218-e382a71b716b',
    'photo-1445205170230-053b83016050',
    'photo-1490481651871-ab68de25d43d',
  ],
}

const KEYWORD_MAP = [
  [/watch/i, 'watch'],
  [/sneaker|running shoe|trainer/i, 'sneakers'],
  [/dress/i, 'dress'],
  [/jacket|coat|blazer/i, 'jacket'],
  [/jeans|denim/i, 'jeans'],
  [/t-shirt|tshirt|tee/i, 'tshirt'],
  [/shirt|blouse|linen/i, 'shirt'],
  [/bag|handbag|purse|crossbody|tote/i, 'handbag'],
  [/backpack/i, 'backpack'],
  [/sneaker|shoe|boot|heel|loafer|sandal/i, 'shoes'],
  [/beanie|hat|cap/i, 'hat'],
  [/scarf/i, 'scarf'],
  [/sweater|hoodie|sweatshirt|knit|cardigan/i, 'sweater'],
  [/suit|formal/i, 'suit'],
  [/jewelry|necklace|bracelet|ring|earring/i, 'jewelry'],
  [/sunglasses|glasses/i, 'sunglasses'],
  [/laptop|computer|macbook/i, 'laptop'],
  [/phone|smartphone|iphone/i, 'smartphone'],
  [/headphone|earphone|earbud|airpod/i, 'headphones'],
  [/camera/i, 'camera'],
  [/speaker/i, 'speaker'],
  [/perfume|fragrance/i, 'perfume'],
  [/belt/i, 'belt'],
  [/wallet/i, 'wallet'],
  [/fitness|gym|sport|yoga/i, 'fitness'],
]

function stableIndex(name, arrayLength) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffff
  }
  return hash % arrayLength
}

export function getProductImage(name = '', size = 400) {
  let category = 'fashion'
  for (const [pattern, key] of KEYWORD_MAP) {
    if (pattern.test(name)) { category = key; break }
  }

  const photos = KEYWORD_PHOTOS[category] || KEYWORD_PHOTOS.fashion
  const photoId = photos[stableIndex(name, photos.length)]

  return `https://images.unsplash.com/${photoId}?w=${size}&h=${size}&fit=crop&auto=format`
}
