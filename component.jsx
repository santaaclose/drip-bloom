import React, { useState, useEffect } from 'react';

const GlassRingsShop = () => {
  const [currentPage, setCurrentPage] = useState('catalog');
  const [selectedFilters, setSelectedFilters] = useState({
    collection: '',
    color: '',
    size: '',
    priceRange: ''
  });
  const [filteredRings, setFilteredRings] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState({});
  const [orderForm, setOrderForm] = useState({
    isOpen: false,
    ring: null,
    selectedSize: '',
    selectedColor: '',
    comment: ''
  });
  const [customOrderForm, setCustomOrderForm] = useState({
    isOpen: false,
    colorIdea: '',
    shapeIdea: '',
    generalIdea: '',
    budget: '',
    timeline: ''
  });

  // Mock данные отзывов
  const reviewsData = [
    {
      id: 1,
      name: 'Анна К.',
      rating: 5,
      text: 'Невероятно красивое кольцо! Качество стекла потрясающее, носится очень комфортно. Получила множество комплиментов!',
      ring: 'Ледяная капля',
      date: '2 недели назад'
    },
    {
      id: 2,
      name: 'Мария Д.',
      rating: 5,
      text: 'Заказывала индивидуальное кольцо с лунной тематикой. Мастер воплотил все мои пожелания! Результат превзошел ожидания.',
      ring: 'Индивидуальный заказ',
      date: '1 месяц назад'
    },
    {
      id: 3,
      name: 'Елена С.',
      rating: 5,
      text: 'Быстрая доставка, красивая упаковка. Кольцо из коллекции THORN просто огонь! Буду заказывать еще.',
      ring: 'Терновый шип',
      date: '3 недели назад'
    }
  ];

  // Mock данные примеров индивидуальных заказов
  const customExamplesData = [
    {
      id: 1,
      name: 'Лунное сияние',
      description: 'Кольцо с эффектом лунного света внутри стекла',
      clientRequest: 'Хотела кольцо, напоминающее лунный свет на воде',
      price: '4500₽',
      timeline: '3 недели',
      image: 'assets/custom-moon-ring.jpeg?prompt=Glass%20ring%20with%20moonlight%20effect%20inside%2C%20silver%20blue%20glow%2C%20mystical%20lunar%20jewelry%2C%20ethereal%20glass%20art'
    },
    {
      id: 2,
      name: 'Осенний лист',
      description: 'Кольцо с имитацией янтаря и листьев внутри',
      clientRequest: 'Кольцо в осенних тонах с листочками',
      price: '3800₽',
      timeline: '2 недели',
      image: 'assets/custom-autumn-ring.jpeg?prompt=Glass%20ring%20with%20autumn%20leaves%20inside%2C%20amber%20orange%20colors%2C%20botanical%20jewelry%2C%20nature%20inspired%20glass%20art'
    },
    {
      id: 3,
      name: 'Звездная пыль',
      description: 'Кольцо с мерцающими частицами как звездное небо',
      clientRequest: 'Хочу носить кусочек космоса на пальце',
      price: '5200₽',
      timeline: '4 недели',
      image: 'assets/custom-star-ring.jpeg?prompt=Glass%20ring%20with%20glittering%20star%20dust%20inside%2C%20cosmic%20sparkles%2C%20deep%20space%20colors%2C%20galaxy%20jewelry%2C%20magical%20glass'
    }
  ];

  // Mock данные колец
  const ringsData = [
    {
      id: 1,
      name: 'Ледяная капля',
      collection: 'ICE&DROP',
      price: 2500,
      sizes: ['16', '17', '18', '19'],
      colors: ['Прозрачный', 'Голубой'],
      description: 'Уникальное стеклянное кольцо ручной работы. Возможен заказ в нужном размере.',
      images: [
        'assets/ice-drop-ring-main.jpeg?prompt=Elegant%20transparent%20glass%20ring%20with%20ice%20effect%2C%20minimalist%20jewelry%20photography%2C%20studio%20lighting',
        'keys/ice-drop-ring-hand?prompt=Transparent%20glass%20ring%20worn%20on%20elegant%20female%20hand%2C%20natural%20lighting%2C%20lifestyle%20photography',
        'keys/ice-drop-ring-closeup?prompt=Macro%20close-up%20of%20transparent%20glass%20ring%20texture%2C%20ice%20effect%20details%2C%20crystal%20clear'
      ]
    },
    {
      id: 2,
      name: 'Морозный кристалл',
      collection: 'ICE&DROP',
      price: 3200,
      sizes: ['17', '18', '19', '20'],
      colors: ['Белый', 'Серебристый'],
      description: 'Уникальное стеклянное кольцо ручной работы. Возможен заказ в нужном размере.',
      images: [
        'assets/frost-crystal-ring-main.jpeg?prompt=Frosted%20glass%20ring%20with%20crystal%20texture%2C%20white%20silver%20colors%2C%20jewelry%20photography%2C%20studio%20setup',
        'assets/frost-crystal-ring-hand.jpeg?prompt=Frosted%20white%20glass%20ring%20on%20hand%2C%20winter%20aesthetic%2C%20natural%20light',
        'keys/frost-crystal-ring-closeup?prompt=Close-up%20macro%20shot%20of%20frosted%20glass%20ring%20texture%2C%20crystal%20pattern%20details'
      ]
    },
    {
      id: 3,
      name: 'Терновый шип',
      collection: 'THORN',
      price: 2800,
      sizes: ['16', '17', '18'],
      colors: ['Черный', 'Темно-серый'],
      description: 'Уникальное стеклянное кольцо ручной работы. Возможен заказ в нужном размере.',
      images: [
        'assets/thorn-ring-main.jpeg?prompt=Dark%20glass%20ring%20with%20sharp%20edges%20and%20thorny%20design%2C%20black%20gray%20colors%2C%20dramatic%20lighting',
        'keys/thorn-ring-hand?prompt=Dark%20glass%20ring%20with%20spikes%20worn%20on%20hand%2C%20gothic%20aesthetic%2C%20moody%20photography',
        'keys/thorn-ring-closeup?prompt=Macro%20shot%20of%20dark%20glass%20ring%20sharp%20edges%2C%20thorn%20details%2C%20geometric%20patterns'
      ]
    },
    {
      id: 4,
      name: 'Роза ветров',
      collection: 'THORN',
      price: 3500,
      sizes: ['17', '18', '19'],
      colors: ['Бордовый', 'Темно-зеленый'],
      description: 'Уникальное стеклянное кольцо ручной работы. Возможен заказ в нужном размере.',
      images: [
        'assets/wind-rose-ring-main.jpeg?prompt=Geometric%20glass%20ring%20with%20burgundy%20dark%20green%20colors%2C%20wind%20rose%20pattern%2C%20artistic%20photography',
        'keys/wind-rose-ring-hand?prompt=Burgundy%20green%20geometric%20glass%20ring%20on%20hand%2C%20autumn%20colors%2C%20elegant%20pose',
        'keys/wind-rose-ring-closeup?prompt=Close-up%20of%20geometric%20glass%20ring%20pattern%2C%20burgundy%20green%20swirls%2C%20detailed%20texture'
      ]
    },
    {
      id: 5,
      name: 'Абстракция',
      collection: 'ART CORE',
      price: 4200,
      sizes: ['16', '17', '18', '19', '20'],
      colors: ['Мультиколор', 'Радужный'],
      description: 'Уникальное стеклянное кольцо ручной работы. Возможен заказ в нужном размере.',
      images: [
        'assets/abstract-ring-main.jpeg?prompt=Abstract%20multicolor%20glass%20ring%20with%20rainbow%20patterns%20inside%2C%20artistic%20jewelry%2C%20vibrant%20colors',
        'keys/abstract-ring-hand?prompt=Colorful%20abstract%20glass%20ring%20worn%20on%20hand%2C%20rainbow%20reflections%2C%20artistic%20lifestyle',
        'keys/abstract-ring-closeup?prompt=Macro%20shot%20of%20abstract%20glass%20ring%20internal%20patterns%2C%20rainbow%20swirls%2C%20art%20glass%20details'
      ]
    },
    {
      id: 6,
      name: 'Космос',
      collection: 'ART CORE',
      price: 3800,
      sizes: ['17', '18', '19'],
      colors: ['Синий', 'Фиолетовый'],
      description: 'Уникальное стеклянное кольцо ручной работы. Возможен заказ в нужном размере.',
      images: [
        'assets/cosmos-ring-main.jpeg?prompt=Glass%20ring%20with%20starry%20night%20sky%20effect%20inside%2C%20blue%20purple%20colors%2C%20cosmic%20jewelry%2C%20mystical',
        'keys/cosmos-ring-hand?prompt=Cosmic%20blue%20purple%20glass%20ring%20on%20hand%2C%20starry%20effect%2C%20night%20sky%20aesthetic',
        'keys/cosmos-ring-closeup?prompt=Close-up%20of%20cosmic%20glass%20ring%20with%20star%20patterns%2C%20deep%20blue%20purple%20galaxy%20effect'
      ]
    }
  ];

  const collections = ['ICE&DROP', 'THORN', 'ART CORE'];
  const colors = ['Прозрачный', 'Голубой', 'Белый', 'Серебристый', 'Черный', 'Темно-серый', 'Бордовый', 'Темно-зеленый', 'Мультиколор', 'Радужный', 'Синий', 'Фиолетовый'];
  const sizes = ['16', '17', '18', '19', '20'];
  const priceRanges = [
    { label: 'До 3000₽', value: '0-3000' },
    { label: '3000-4000₽', value: '3000-4000' },
    { label: 'От 4000₽', value: '4000-99999' }
  ];

  // Функция фильтрации
  useEffect(() => {
    let filtered = ringsData;

    if (selectedFilters.collection) {
      filtered = filtered.filter(ring => ring.collection === selectedFilters.collection);
    }
    if (selectedFilters.color) {
      filtered = filtered.filter(ring => ring.colors.includes(selectedFilters.color));
    }
    if (selectedFilters.size) {
      filtered = filtered.filter(ring => ring.sizes.includes(selectedFilters.size));
    }
    if (selectedFilters.priceRange) {
      const [min, max] = selectedFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(ring => ring.price >= min && ring.price <= max);
    }

    setFilteredRings(filtered);
  }, [selectedFilters]);

  useEffect(() => {
    setFilteredRings(ringsData);
    // Инициализируем индексы изображений
    const initialImageIndices = {};
    ringsData.forEach(ring => {
      initialImageIndices[ring.id] = 0;
    });
    setSelectedImageIndex(initialImageIndices);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      collection: '',
      color: '',
      size: '',
      priceRange: ''
    });
  };

  const handleImageChange = (ringId, imageIndex) => {
    setSelectedImageIndex(prev => ({
      ...prev,
      [ringId]: imageIndex
    }));
  };

  const handleOrder = (ring) => {
    setOrderForm({
      isOpen: true,
      ring: ring,
      selectedSize: ring.sizes[0] || '',
      selectedColor: ring.colors[0] || '',
      comment: ''
    });
  };

  const closeOrderForm = () => {
    setOrderForm({
      isOpen: false,
      ring: null,
      selectedSize: '',
      selectedColor: '',
      comment: ''
    });
  };

  const handleOrderSubmit = () => {
    const { ring, selectedSize, selectedColor, comment } = orderForm;
    
    let message = `Здравствуйте! Хочу заказать кольцо:

📍 Товар: ${ring.name} (${ring.collection})
💰 Цена: ${ring.price}₽
📏 Размер: ${selectedSize}
🎨 Цвет: ${selectedColor}`;

    if (comment.trim()) {
      message += `
💬 Комментарий: ${comment}`;
    }

    message += `

🔗 Ссылка на товар: drip-bloom.ru/ring/${ring.id}`;
    
    // Симуляция отправки в Telegram
    alert(`Сообщение отправлено продавцу!\n\n${message}`);
    
    // Закрываем форму
    closeOrderForm();
  };

  const openCustomOrderForm = () => {
    setCustomOrderForm({
      isOpen: true,
      colorIdea: '',
      shapeIdea: '',
      generalIdea: '',
      budget: '',
      timeline: ''
    });
  };

  const closeCustomOrderForm = () => {
    setCustomOrderForm({
      isOpen: false,
      colorIdea: '',
      shapeIdea: '',
      generalIdea: '',
      budget: '',
      timeline: ''
    });
  };

  const handleCustomOrderSubmit = () => {
    const { colorIdea, shapeIdea, generalIdea, budget, timeline } = customOrderForm;
    
    let message = `Здравствуйте! Хочу заказать индивидуальное кольцо:

🎨 Цвет и материалы: ${colorIdea || 'не указано'}

🔷 Форма и дизайн: ${shapeIdea || 'не указано'}

💡 Общая идея: ${generalIdea || 'не указано'}`;

    if (budget) {
      message += `
💰 Примерный бюджет: ${budget}`;
    }

    if (timeline) {
      message += `
⏰ Желаемые сроки: ${timeline}`;
    }

    message += `

🛠️ Тип заказа: Индивидуальное изготовление
📞 Прошу связаться для обсуждения деталей`;
    
    // Симуляция отправки в Telegram
    alert(`Запрос на индивидуальное кольцо отправлен!\n\n${message}`);
    
    // Закрываем форму
    closeCustomOrderForm();
  };

  const CatalogPage = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <header 
        className="backdrop-blur-sm sticky top-0 z-10 border-b" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 246, 0.9) 50%, rgba(252, 250, 248, 0.95) 100%)',
          borderColor: 'rgba(238, 193, 229, 0.15)',
          boxShadow: '0 4px 32px rgba(238, 193, 229, 0.08)'
        }}
      >
        <div className="max-w-md mx-auto px-8 py-10">
          <div className="text-center">
            <h1 className="text-3xl font-extralight tracking-wide mb-1" style={{ color: '#6B4C57' }}>Drip Bloom</h1>
            <p className="text-sm font-light" style={{ color: '#8B7355' }}>Стеклянные кольца ручной работы</p>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div 
        className="backdrop-blur-sm border-b" 
        style={{ 
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(252, 250, 248, 0.85) 50%, rgba(250, 248, 246, 0.9) 100%)',
          borderColor: 'rgba(238, 193, 229, 0.12)',
          boxShadow: '0 2px 16px rgba(238, 193, 229, 0.04)'
        }}
      >
        <div className="max-w-md mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-light" style={{ color: '#6B4C57' }}>Фильтры</h3>
            <button 
              onClick={clearFilters}
              className="text-sm font-light transition-colors"
              style={{ color: '#EEC1E5' }}
              onMouseOver={(e) => e.target.style.color = '#E8A5C1'}
              onMouseOut={(e) => e.target.style.color = '#EEC1E5'}
            >
              Сбросить
            </button>
          </div>
          
          {/* Collections */}
          <div className="mb-4">
            <p className="text-xs mb-3 font-light tracking-wider" style={{ color: '#8B7355' }}>КОЛЛЕКЦИИ</p>
            <div className="flex flex-wrap gap-2">
              {collections.map(collection => (
                <button
                  key={collection}
                  onClick={() => handleFilterChange('collection', collection)}
                  className="px-5 py-3 rounded-2xl text-xs transition-all duration-500 ease-in-out transform hover:scale-105 font-light shadow-sm"
                  style={{
                    backgroundColor: selectedFilters.collection === collection ? '#F8F3F6' : '#FEFEFE',
                    color: selectedFilters.collection === collection ? '#6B4C57' : '#8B7355',
                    transform: selectedFilters.collection === collection ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: selectedFilters.collection === collection 
                      ? '0 12px 32px rgba(238, 193, 229, 0.3)' 
                      : '0 4px 16px rgba(238, 193, 229, 0.1)',
                    border: selectedFilters.collection === collection 
                      ? '1px solid rgba(238, 193, 229, 0.3)' 
                      : '1px solid rgba(238, 193, 229, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    if (selectedFilters.collection !== collection) {
                      e.target.style.backgroundColor = 'rgba(246, 231, 239, 0.4)';
                      e.target.style.boxShadow = '0 8px 24px rgba(238, 193, 229, 0.2)';
                      e.target.style.borderColor = 'rgba(238, 193, 229, 0.2)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedFilters.collection !== collection) {
                      e.target.style.backgroundColor = '#FAFAFA';
                      e.target.style.boxShadow = '0 4px 16px rgba(238, 193, 229, 0.1)';
                      e.target.style.borderColor = 'rgba(238, 193, 229, 0.1)';
                    }
                  }}
                >
                  {collection}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <p className="text-xs mb-3 font-light tracking-wider" style={{ color: '#8B7355' }}>ЦЕНА</p>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => handleFilterChange('priceRange', range.value)}
                  className="px-5 py-3 rounded-2xl text-xs transition-all duration-500 ease-in-out transform hover:scale-105 font-light shadow-sm"
                  style={{
                    backgroundColor: selectedFilters.priceRange === range.value ? '#F0F8F4' : '#FEFEFE',
                    color: selectedFilters.priceRange === range.value ? '#2D5A3D' : '#8B7355',
                    transform: selectedFilters.priceRange === range.value ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: selectedFilters.priceRange === range.value 
                      ? '0 12px 32px rgba(215, 246, 226, 0.4)' 
                      : '0 4px 16px rgba(238, 193, 229, 0.1)',
                    border: selectedFilters.priceRange === range.value 
                      ? '1px solid rgba(215, 246, 226, 0.4)' 
                      : '1px solid rgba(238, 193, 229, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    if (selectedFilters.priceRange !== range.value) {
                      e.target.style.backgroundColor = 'rgba(215, 246, 226, 0.4)';
                      e.target.style.boxShadow = '0 8px 24px rgba(215, 246, 226, 0.3)';
                      e.target.style.borderColor = 'rgba(215, 246, 226, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedFilters.priceRange !== range.value) {
                      e.target.style.backgroundColor = '#FAFAFA';
                      e.target.style.boxShadow = '0 4px 16px rgba(238, 193, 229, 0.1)';
                      e.target.style.borderColor = 'rgba(238, 193, 229, 0.1)';
                    }
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-2">
            <p className="text-xs mb-3 font-light tracking-wider" style={{ color: '#8B7355' }}>РАЗМЕР</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleFilterChange('size', size)}
                  className="px-5 py-3 rounded-2xl text-xs transition-all duration-500 ease-in-out transform hover:scale-105 font-light shadow-sm"
                  style={{
                    backgroundColor: selectedFilters.size === size ? '#FAF8F5' : '#FEFEFE',
                    color: selectedFilters.size === size ? '#6B4C57' : '#8B7355',
                    transform: selectedFilters.size === size ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: selectedFilters.size === size 
                      ? '0 12px 32px rgba(238, 193, 229, 0.3)' 
                      : '0 4px 16px rgba(238, 193, 229, 0.1)',
                    border: selectedFilters.size === size 
                      ? '1px solid rgba(238, 193, 229, 0.3)' 
                      : '1px solid rgba(238, 193, 229, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    if (selectedFilters.size !== size) {
                      e.target.style.backgroundColor = 'rgba(247, 244, 239, 0.6)';
                      e.target.style.boxShadow = '0 8px 24px rgba(238, 193, 229, 0.2)';
                      e.target.style.borderColor = 'rgba(238, 193, 229, 0.2)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedFilters.size !== size) {
                      e.target.style.backgroundColor = '#FAFAFA';
                      e.target.style.boxShadow = '0 4px 16px rgba(238, 193, 229, 0.1)';
                      e.target.style.borderColor = 'rgba(238, 193, 229, 0.1)';
                    }
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="text-sm mb-6 font-light" style={{ color: '#8B7355' }}>
          Найдено товаров: {filteredRings.length}
        </div>

        <div className="space-y-12">
          {filteredRings.map(ring => (
            <div 
              key={ring.id} 
              className="backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-700 ease-out transform hover:scale-[1.02]"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(252, 250, 248, 0.95) 100%)',
                boxShadow: '0 16px 48px rgba(238, 193, 229, 0.12)',
                border: '1px solid rgba(238, 193, 229, 0.08)',
                backdropFilter: 'blur(20px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 24px 64px rgba(238, 193, 229, 0.25)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 231, 239, 0.4) 100%)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(238, 193, 229, 0.15)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 244, 239, 0.6) 100%)';
              }}
            >
              {/* Image Gallery */}
              <div className="relative">
                <div 
                  className="aspect-square flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, #FFFFFF 0%, #F7F4EF 50%, #F6E7EF 100%)`,
                  }}
                >
                  {/* Стеклянные отражения */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgba(238, 193, 229, 0.3) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 70%, rgba(215, 246, 226, 0.2) 0%, transparent 50%)`
                    }}
                  ></div>
                  <img 
                    src={ring.images[selectedImageIndex[ring.id] || 0]} 
                    alt={ring.name}
                    className="w-full h-full object-cover relative z-10"
                    style={{
                      filter: 'drop-shadow(0 12px 24px rgba(238, 193, 229, 0.2))'
                    }}
                  />
                  {/* Размытое отражение */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20 z-0"
                    style={{
                      background: `linear-gradient(to top, rgba(238, 193, 229, 0.2) 0%, transparent 100%)`,
                      filter: 'blur(12px)'
                    }}
                  ></div>
                </div>
                
                {/* Image Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {ring.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(ring.id, index)}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out transform hover:scale-125 ${
                        (selectedImageIndex[ring.id] || 0) === index
                          ? 'bg-white shadow-md scale-110'
                          : 'bg-white/40 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Image Navigation Labels */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {(selectedImageIndex[ring.id] || 0) === 0 ? 'Общий вид' : 
                     (selectedImageIndex[ring.id] || 0) === 1 ? 'На руке' : 'Крупный план'}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-light text-xl mb-1" style={{ color: '#5A3D47' }}>{ring.name}</h3>
                    <p className="text-sm font-light tracking-wide" style={{ color: '#7A634A' }}>{ring.collection}</p>
                  </div>
                  <p className="text-2xl font-extralight" style={{ color: '#5A3D47' }}>{ring.price}₽</p>
                </div>

                <p className="text-sm mb-5 leading-relaxed font-light" style={{ color: '#7A634A' }}>{ring.description}</p>

                {/* Sizes */}
                <div className="mb-4">
                  <p className="text-xs font-light tracking-wider mb-3" style={{ color: '#7A634A' }}>РАЗМЕРЫ В НАЛИЧИИ</p>
                  <div className="flex flex-wrap gap-2">
                    {ring.sizes.map(size => (
                      <span 
                        key={size}
                        className="px-3 py-1 rounded-lg text-xs font-light"
                        style={{ 
                          backgroundColor: '#FAF8F5', 
                          color: '#5A3D47',
                          border: '1px solid rgba(238, 193, 229, 0.15)'
                        }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <p className="text-xs font-light tracking-wider mb-3" style={{ color: '#7A634A' }}>ЦВЕТА</p>
                  <div className="flex flex-wrap gap-2">
                    {ring.colors.map(color => (
                      <span 
                        key={color}
                        className="px-3 py-1 rounded-lg text-xs font-light"
                        style={{ 
                          backgroundColor: '#F0F8F4', 
                          color: '#2D5A3D',
                          border: '1px solid rgba(215, 246, 226, 0.3)'
                        }}
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleOrder(ring)}
                  className="w-full py-4 rounded-2xl text-sm font-light transition-all duration-500 ease-out transform hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #F8E8F5 0%, #F0D4EC 100%)',
                    color: '#5A3D47',
                    boxShadow: '0 12px 32px rgba(238, 193, 229, 0.25)',
                    border: '1px solid rgba(238, 193, 229, 0.15)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#E8A5C1';
                    e.target.style.boxShadow = '0 16px 48px rgba(238, 193, 229, 0.4)';
                    e.target.style.borderColor = 'rgba(238, 193, 229, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#EEC1E5';
                    e.target.style.boxShadow = '0 12px 32px rgba(238, 193, 229, 0.3)';
                    e.target.style.borderColor = 'rgba(238, 193, 229, 0.2)';
                  }}
                >
                  Заказать кольцо
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 backdrop-blur-sm border-t"
        style={{
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(252, 250, 248, 0.9) 100%)',
          borderColor: 'rgba(238, 193, 229, 0.12)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 -8px 32px rgba(238, 193, 229, 0.08)'
        }}
      >
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <button 
              onClick={() => setCurrentPage('catalog')}
              className="flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110"
              style={{
                color: currentPage === 'catalog' ? '#5A3D47' : '#8B7355',
                transform: currentPage === 'catalog' ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (currentPage !== 'catalog') {
                  e.currentTarget.style.color = '#8B5A6B';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== 'catalog') {
                  e.currentTarget.style.color = '#B8A8C0';
                }
              }}
            >
              <span className="text-xl mb-1">🛍️</span>
              <span className="text-xs font-light">Каталог</span>
            </button>
            <button 
              onClick={() => setCurrentPage('reviews')}
              className="flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110"
              style={{
                color: currentPage === 'reviews' ? '#8B5A6B' : '#B8A8C0',
                transform: currentPage === 'reviews' ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (currentPage !== 'reviews') {
                  e.currentTarget.style.color = '#8B5A6B';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== 'reviews') {
                  e.currentTarget.style.color = '#B8A8C0';
                }
              }}
            >
              <span className="text-xl mb-1">💬</span>
              <span className="text-xs font-light">Отзывы</span>
            </button>
            <button 
              onClick={() => setCurrentPage('delivery')}
              className="flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110"
              style={{
                color: currentPage === 'delivery' ? '#8B5A6B' : '#B8A8C0',
                transform: currentPage === 'delivery' ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (currentPage !== 'delivery') {
                  e.currentTarget.style.color = '#8B5A6B';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== 'delivery') {
                  e.currentTarget.style.color = '#B8A8C0';
                }
              }}
            >
              <span className="text-xl mb-1">🚚</span>
              <span className="text-xs font-light">Доставка</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Custom Order Button */}
      <div className="fixed bottom-20 right-6 z-40">
        <button
          onClick={openCustomOrderForm}
          className="px-6 py-4 rounded-full transition-all duration-500 ease-out transform hover:scale-105 flex items-center gap-3 font-light"
          style={{
            background: 'linear-gradient(135deg, #D7F6E2 0%, #EEC1E5 100%)',
            color: '#8B5A6B',
            boxShadow: '0 16px 48px rgba(238, 193, 229, 0.3)',
            border: '1px solid rgba(238, 193, 229, 0.2)'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #C8F2D6 0%, #E8A5C1 100%)';
            e.target.style.boxShadow = '0 20px 64px rgba(238, 193, 229, 0.4)';
            e.target.style.borderColor = 'rgba(238, 193, 229, 0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #D7F6E2 0%, #EEC1E5 100%)';
            e.target.style.boxShadow = '0 16px 48px rgba(238, 193, 229, 0.3)';
            e.target.style.borderColor = 'rgba(238, 193, 229, 0.2)';
          }}
        >
          <span className="text-lg">✨</span>
          <span className="text-sm font-light">Индивидуальное</span>
        </button>
      </div>

      <div className="h-20"></div>
    </div>
  );

  // Reviews Page Component
  const ReviewsPage = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <header 
        className="backdrop-blur-sm sticky top-0 z-10 border-b" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(215, 246, 226, 0.8) 0%, rgba(246, 231, 239, 0.8) 100%)',
          borderColor: 'rgba(238, 193, 229, 0.2)',
          boxShadow: '0 4px 32px rgba(238, 193, 229, 0.1)'
        }}
      >
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-extralight tracking-wide mb-1" style={{ color: '#5A3D47' }}>Drip Bloom</h1>
            <p className="text-sm font-light" style={{ color: '#7A634A' }}>Отзывы клиентов</p>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Reviews Section */}
        <div className="mb-8">
          <h2 className="text-xl font-extralight mb-6" style={{ color: '#5A3D47' }}>💬 Отзывы клиентов</h2>
          <div className="space-y-4 mb-8">
            {reviewsData.map(review => (
              <div 
                key={review.id} 
                className="backdrop-blur-sm rounded-2xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)',
                  boxShadow: '0 8px 24px rgba(238, 193, 229, 0.1)',
                  border: '1px solid rgba(238, 193, 229, 0.1)'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-light" style={{ color: '#8B5A6B' }}>{review.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-sm">⭐</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-light" style={{ color: '#B8A8C0' }}>{review.date}</span>
                </div>
                <p className="text-sm leading-relaxed mb-3 font-light" style={{ color: '#B8A8C0' }}>{review.text}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-light" style={{ color: '#B8A8C0' }}>Товар:</span>
                  <span className="text-xs font-light" style={{ color: '#4A7C59' }}>{review.ring}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Examples Section */}
        <div className="mb-8">
          <h2 className="text-xl font-extralight mb-6" style={{ color: '#8B5A6B' }}>✨ Примеры индивидуальных заказов</h2>
          <div className="space-y-6 mb-8">
            {customExamplesData.map(example => (
              <div 
                key={example.id} 
                className="backdrop-blur-sm rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)',
                  boxShadow: '0 8px 24px rgba(238, 193, 229, 0.1)',
                  border: '1px solid rgba(238, 193, 229, 0.1)'
                }}
              >
                {/* Image */}
                <div 
                  className="aspect-square flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, #FFFFFF 0%, #F7F4EF 50%, #F6E7EF 100%)`,
                  }}
                >
                  <img 
                    src={example.image} 
                    alt={example.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-light text-lg" style={{ color: '#8B5A6B' }}>{example.name}</h3>
                      <p className="text-sm mt-1 font-light" style={{ color: '#B8A8C0' }}>{example.description}</p>
                    </div>
                    <span className="text-lg font-extralight" style={{ color: '#8B5A6B' }}>{example.price}</span>
                  </div>
                  
                  <div 
                    className="p-4 rounded-xl mb-4"
                    style={{ backgroundColor: '#F6E7EF' }}
                  >
                    <p className="text-xs font-light tracking-wider mb-1" style={{ color: '#B8A8C0' }}>ПОЖЕЛАНИЕ КЛИЕНТА</p>
                    <p className="text-sm italic font-light" style={{ color: '#8B5A6B' }}>"{example.clientRequest}"</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs" style={{ color: '#B8A8C0' }}>
                    <span className="font-light">⏰ Срок изготовления: {example.timeline}</span>
                    <button 
                      onClick={openCustomOrderForm}
                      className="font-light transition-colors"
                      style={{ color: '#EEC1E5' }}
                      onMouseOver={(e) => e.target.style.color = '#E8A5C1'}
                      onMouseOut={(e) => e.target.style.color = '#EEC1E5'}
                    >
                      Заказать похожее →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA для индивидуальных заказов */}
          <div 
            className="rounded-2xl p-6"
            style={{ backgroundColor: '#F6E7EF' }}
          >
            <div className="text-center">
              <span className="text-2xl mb-3 block">✨</span>
              <h3 className="font-light mb-2" style={{ color: '#8B5A6B' }}>Есть своя идея?</h3>
              <p className="text-sm mb-4 leading-relaxed font-light" style={{ color: '#B8A8C0' }}>
                Опишите ваше видение идеального кольца, и мы воплотим его в стекле
              </p>
              <button
                onClick={openCustomOrderForm}
                className="px-6 py-3 rounded-xl text-sm font-light transition-all duration-300 shadow-sm"
                style={{
                  backgroundColor: '#EEC1E5',
                  color: '#8B5A6B',
                  border: '1px solid rgba(238, 193, 229, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#E8A5C1';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#EEC1E5';
                }}
              >
                Заказать индивидуальное кольцо
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 backdrop-blur-sm border-t"
        style={{
          background: 'linear-gradient(to top, rgba(215, 246, 226, 0.9) 0%, rgba(246, 231, 239, 0.8) 100%)',
          borderColor: 'rgba(238, 193, 229, 0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 -8px 32px rgba(238, 193, 229, 0.1)'
        }}
      >
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <button 
              onClick={() => setCurrentPage('catalog')}
              className="flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110"
              style={{
                color: currentPage === 'catalog' ? '#8B5A6B' : '#B8A8C0',
                transform: currentPage === 'catalog' ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (currentPage !== 'catalog') {
                  e.currentTarget.style.color = '#8B5A6B';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== 'catalog') {
                  e.currentTarget.style.color = '#B8A8C0';
                }
              }}
            >
              <span className="text-xl mb-1">🛍️</span>
              <span className="text-xs font-light">Каталог</span>
            </button>
            <button 
              onClick={() => setCurrentPage('reviews')}
              className="flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110"
              style={{
                color: currentPage === 'reviews' ? '#8B5A6B' : '#B8A8C0',
                transform: currentPage === 'reviews' ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (currentPage !== 'reviews') {
                  e.currentTarget.style.color = '#8B5A6B';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== 'reviews') {
                  e.currentTarget.style.color = '#B8A8C0';
                }
              }}
            >
              <span className="text-xl mb-1">💬</span>
              <span className="text-xs font-light">Отзывы</span>
            </button>
            <button 
              onClick={() => setCurrentPage('delivery')}
              className="flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110"
              style={{
                color: currentPage === 'delivery' ? '#8B5A6B' : '#B8A8C0',
                transform: currentPage === 'delivery' ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (currentPage !== 'delivery') {
                  e.currentTarget.style.color = '#8B5A6B';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== 'delivery') {
                  e.currentTarget.style.color = '#B8A8C0';
                }
              }}
            >
              <span className="text-xl mb-1">🚚</span>
              <span className="text-xs font-light">Доставка</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </div>
  );

  const DeliveryPage = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <header 
        className="backdrop-blur-sm border-b" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(215, 246, 226, 0.8) 0%, rgba(246, 231, 239, 0.8) 100%)',
          borderColor: 'rgba(238, 193, 229, 0.2)',
          boxShadow: '0 4px 32px rgba(238, 193, 229, 0.1)'
        }}
      >
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-extralight tracking-wide mb-1" style={{ color: '#8B5A6B' }}>Drip Bloom</h1>
          </div>
          <h2 className="text-xl font-extralight" style={{ color: '#8B5A6B' }}>Доставка и оплата</h2>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Delivery */}
        <div 
          className="backdrop-blur-sm rounded-2xl p-6 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)',
            boxShadow: '0 8px 24px rgba(238, 193, 229, 0.1)',
            border: '1px solid rgba(238, 193, 229, 0.1)'
          }}
        >
          <h2 className="text-lg font-extralight mb-5" style={{ color: '#8B5A6B' }}>🚚 Доставка</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="font-light mb-3" style={{ color: '#8B5A6B' }}>По Москве</h3>
              <p className="text-sm font-light" style={{ color: '#B8A8C0' }}>• Курьерская доставка - 300₽</p>
              <p className="text-sm font-light" style={{ color: '#B8A8C0' }}>• Самовывоз - бесплатно</p>
              <p className="text-sm mt-2 font-light" style={{ color: '#B8A8C0' }}>Доставка в течение 1-2 дней</p>
            </div>
            
            <div>
              <h3 className="font-light mb-3" style={{ color: '#8B5A6B' }}>По России</h3>
              <p className="text-sm font-light" style={{ color: '#B8A8C0' }}>• Почта России - от 250₽</p>
              <p className="text-sm font-light" style={{ color: '#B8A8C0' }}>• СДЭК - от 350₽</p>
              <p className="text-sm mt-2 font-light" style={{ color: '#B8A8C0' }}>Доставка 3-7 дней</p>
            </div>
            
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#D7F6E2' }}
            >
              <p className="text-sm font-light" style={{ color: '#4A7C59' }}>
                💎 Бесплатная доставка при заказе от 5000₽
              </p>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div 
          className="backdrop-blur-sm rounded-2xl p-6 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)',
            boxShadow: '0 8px 24px rgba(238, 193, 229, 0.1)',
            border: '1px solid rgba(238, 193, 229, 0.1)'
          }}
        >
          <h2 className="text-lg font-extralight mb-5" style={{ color: '#8B5A6B' }}>💳 Оплата</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-lg mr-3">💳</span>
              <div>
                <p className="text-sm font-light" style={{ color: '#8B5A6B' }}>Банковская карта</p>
                <p className="text-xs font-light" style={{ color: '#B8A8C0' }}>Visa, MasterCard, МИР</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-lg mr-3">📱</span>
              <div>
                <p className="text-sm font-light" style={{ color: '#8B5A6B' }}>СБП</p>
                <p className="text-xs font-light" style={{ color: '#B8A8C0' }}>Система быстрых платежей</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-lg mr-3">💰</span>
              <div>
                <p className="text-sm font-light" style={{ color: '#8B5A6B' }}>Наличными</p>
                <p className="text-xs font-light" style={{ color: '#B8A8C0' }}>При получении (только Москва)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div 
          className="backdrop-blur-sm rounded-2xl p-6 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)',
            boxShadow: '0 8px 24px rgba(238, 193, 229, 0.1)',
            border: '1px solid rgba(238, 193, 229, 0.1)'
          }}
        >
          <h2 className="text-lg font-extralight mb-5" style={{ color: '#8B5A6B' }}>🛡️ Гарантии</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-lg mr-3 mt-0.5">✨</span>
              <div>
                <p className="text-sm font-light" style={{ color: '#8B5A6B' }}>Качество</p>
                <p className="text-xs font-light leading-relaxed" style={{ color: '#B8A8C0' }}>Каждое кольцо изготавливается вручную из качественного стекла</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-lg mr-3 mt-0.5">🔄</span>
              <div>
                <p className="text-sm font-light" style={{ color: '#8B5A6B' }}>Обмен и возврат</p>
                <p className="text-xs font-light leading-relaxed" style={{ color: '#B8A8C0' }}>14 дней на обмен, если размер не подошел</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-lg mr-3 mt-0.5">📦</span>
              <div>
                <p className="text-sm font-light" style={{ color: '#8B5A6B' }}>Упаковка</p>
                <p className="text-xs font-light leading-relaxed" style={{ color: '#B8A8C0' }}>Безопасная упаковка и подарочная коробочка</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div 
          className="backdrop-blur-sm rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)',
            boxShadow: '0 8px 24px rgba(238, 193, 229, 0.1)',
            border: '1px solid rgba(238, 193, 229, 0.1)'
          }}
        >
          <h2 className="text-lg font-extralight mb-5" style={{ color: '#8B5A6B' }}>📞 Контакты</h2>
          
          <div className="space-y-2">
            <p className="text-sm font-light" style={{ color: '#B8A8C0' }}>Telegram: @dripbloom_shop</p>
            <p className="text-sm font-light" style={{ color: '#B8A8C0' }}>Instagram: @drip.bloom.rings</p>
            <p className="text-sm font-light" style={{ color: '#B8A8C0' }}>Время работы: 10:00 - 20:00</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-stone-100">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <button 
              onClick={() => setCurrentPage('catalog')}
              className={`flex flex-col items-center py-3 px-4 transition-colors duration-300 ${
                currentPage === 'catalog' ? 'text-rose-500' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <span className="text-xl mb-1">🛍️</span>
              <span className="text-xs font-light">Каталог</span>
            </button>
            <button 
              onClick={() => setCurrentPage('reviews')}
              className={`flex flex-col items-center py-3 px-4 transition-colors duration-300 ${
                currentPage === 'reviews' ? 'text-rose-500' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <span className="text-xl mb-1">💬</span>
              <span className="text-xs font-light">Отзывы</span>
            </button>
            <button 
              onClick={() => setCurrentPage('delivery')}
              className={`flex flex-col items-center py-3 px-4 transition-colors duration-300 ${
                currentPage === 'delivery' ? 'text-rose-500' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <span className="text-xl mb-1">🚚</span>
              <span className="text-xs font-light">Доставка</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </div>
  );

  // Order Form Modal Component
  const OrderFormModal = () => {
    if (!orderForm.isOpen || !orderForm.ring) return null;

    const { ring } = orderForm;

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-center p-4">
        <div 
          className="backdrop-blur-sm rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-y-auto"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            boxShadow: '0 -8px 32px rgba(246, 231, 239, 0.3)',
            border: '1px solid rgba(247, 244, 239, 0.2)'
          }}
        >
          {/* Header */}
          <div 
            className="sticky top-0 backdrop-blur-sm border-b p-8 rounded-t-3xl"
            style={{
              backgroundColor: 'rgba(247, 244, 239, 0.98)',
              borderColor: 'rgba(247, 244, 239, 0.3)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-light text-stone-800">Оформить заказ</h3>
              <button 
                onClick={closeOrderForm}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-all duration-300 ease-in-out transform hover:scale-110"
              >
                <span className="text-stone-400">✕</span>
              </button>
            </div>
            
            {/* Product Info */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-stone-50 to-rose-50 flex-shrink-0">
                <img 
                  src={ring.images[0]} 
                  alt={ring.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-light text-stone-800">{ring.name}</h4>
                <p className="text-sm text-stone-500 font-light">{ring.collection}</p>
                <p className="text-lg font-extralight text-stone-700">{ring.price}₽</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-light text-stone-700 mb-3">
                Выберите размер
              </label>
              <div className="flex flex-wrap gap-2">
                {ring.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setOrderForm(prev => ({ ...prev, selectedSize: size }))}
                    className={`px-4 py-2 rounded-xl transition-all duration-400 ease-in-out transform hover:scale-105 ${
                      orderForm.selectedSize === size
                        ? 'bg-rose-100 text-rose-600 shadow-md scale-105'
                        : 'bg-stone-100 text-stone-600 hover:bg-rose-50 hover:shadow-sm'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-light text-stone-700 mb-3">
                Выберите цвет
              </label>
              <div className="flex flex-wrap gap-2">
                {ring.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setOrderForm(prev => ({ ...prev, selectedColor: color }))}
                    className={`px-4 py-2 rounded-xl transition-all duration-400 ease-in-out transform hover:scale-105 ${
                      orderForm.selectedColor === color
                        ? 'bg-emerald-100 text-emerald-600 shadow-md scale-105'
                        : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:shadow-sm'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Field */}
            <div className="mb-6">
              <label className="block text-sm font-light text-stone-700 mb-3">
                Комментарий к заказу
              </label>
              <textarea
                value={orderForm.comment}
                onChange={(e) => setOrderForm(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Например: Можно с розовыми шипами? Или укажите особые пожелания..."
                className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-all duration-300 ease-in-out transform focus:scale-[1.01] font-light"
                rows="4"
              />
              <p className="text-xs text-stone-400 mt-2 font-light">
                Опишите ваши пожелания или задайте вопросы мастеру
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={closeOrderForm}
                className="flex-1 py-3 px-4 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] font-light"
              >
                Отмена
              </button>
              <button
                onClick={handleOrderSubmit}
                className="flex-1 py-3 px-4 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl transition-all duration-400 ease-out transform hover:scale-[1.02] hover:shadow-md shadow-sm font-light"
              >
                Оформить заказ
              </button>
            </div>

            {/* Info */}
            <div className="mt-4 p-4 bg-rose-50 rounded-xl">
              <p className="text-xs text-stone-600 font-light">
                📱 После нажатия "Оформить заказ" будет автоматически сформировано сообщение для отправки продавцу в Telegram
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Custom Order Form Modal Component
  const CustomOrderFormModal = () => {
    if (!customOrderForm.isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-100 p-6 rounded-t-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="text-lg font-light text-stone-800">Индивидуальное кольцо</h3>
              </div>
              <button 
                onClick={closeCustomOrderForm}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
              >
                <span className="text-stone-400">✕</span>
              </button>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Опишите ваше видение идеального кольца, и мы воплотим его в стекле
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Color Ideas */}
            <div className="mb-6">
              <label className="block text-sm font-light text-stone-700 mb-3">
                🎨 Цвет и материалы
              </label>
              <textarea
                value={customOrderForm.colorIdea}
                onChange={(e) => setCustomOrderForm(prev => ({ ...prev, colorIdea: e.target.value }))}
                placeholder="Например: прозрачное стекло с золотистыми вкраплениями, матовый черный с глянцевыми полосами..."
                className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light"
                rows="3"
              />
            </div>

            {/* Shape Ideas */}
            <div className="mb-6">
              <label className="block text-sm font-light text-stone-700 mb-3">
                🔷 Форма и дизайн
              </label>
              <textarea
                value={customOrderForm.shapeIdea}
                onChange={(e) => setCustomOrderForm(prev => ({ ...prev, shapeIdea: e.target.value }))}
                placeholder="Например: овальное с острыми краями, широкое кольцо с узором внутри, минималистичная геометрия..."
                className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light"
                rows="3"
              />
            </div>

            {/* General Idea */}
            <div className="mb-6">
              <label className="block text-sm font-light text-stone-700 mb-3">
                💡 Общая идея или вдохновение
              </label>
              <textarea
                value={customOrderForm.generalIdea}
                onChange={(e) => setCustomOrderForm(prev => ({ ...prev, generalIdea: e.target.value }))}
                placeholder="Например: кольцо в стиле морской волны, космическая тематика, винтажная элегантность, подражание кристаллу льда..."
                className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light"
                rows="4"
              />
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="block text-sm font-light text-stone-700 mb-3">
                💰 Примерный бюджет (опционально)
              </label>
              <select
                value={customOrderForm.budget}
                onChange={(e) => setCustomOrderForm(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light"
              >
                <option value="">Не указывать</option>
                <option value="до 5000₽">до 5000₽</option>
                <option value="5000-8000₽">5000-8000₽</option>
                <option value="8000-12000₽">8000-12000₽</option>
                <option value="от 12000₽">от 12000₽</option>
                <option value="обсудим">Обсудим индивидуально</option>
              </select>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <label className="block text-sm font-light text-stone-700 mb-3">
                ⏰ Желаемые сроки (опционально)
              </label>
              <select
                value={customOrderForm.timeline}
                onChange={(e) => setCustomOrderForm(prev => ({ ...prev, timeline: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light"
              >
                <option value="">Не указывать</option>
                <option value="1-2 недели">1-2 недели</option>
                <option value="2-4 недели">2-4 недели</option>
                <option value="1-2 месяца">1-2 месяца</option>
                <option value="не спешу">Не спешу, качество важнее</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={closeCustomOrderForm}
                className="flex-1 py-3 px-4 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-colors font-light"
              >
                Отмена
              </button>
              <button
                onClick={handleCustomOrderSubmit}
                className="flex-1 py-3 px-4 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl transition-all duration-300 shadow-sm font-light"
              >
                Отправить запрос
              </button>
            </div>

            {/* Info */}
            <div className="mt-4 p-4 bg-rose-50 rounded-xl">
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                ✨ Мастер свяжется с вами для обсуждения деталей, создания эскиза и уточнения стоимости
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentPage === 'catalog' && <CatalogPage />}
      {currentPage === 'reviews' && <ReviewsPage />}
      {currentPage === 'delivery' && <DeliveryPage />}
      <OrderFormModal />
      <CustomOrderFormModal />
    </div>
  );
};

export default GlassRingsShop;