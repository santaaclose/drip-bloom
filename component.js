// <stdin>
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
var GlassRingsShop = () => {
  const [currentPage, setCurrentPage] = useState("catalog");
  const [selectedFilters, setSelectedFilters] = useState({
    collection: "",
    color: "",
    size: "",
    priceRange: ""
  });
  const [filteredRings, setFilteredRings] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState({});
  const [orderForm, setOrderForm] = useState({
    isOpen: false,
    ring: null,
    selectedSize: "",
    selectedColor: "",
    comment: ""
  });
  const [customOrderForm, setCustomOrderForm] = useState({
    isOpen: false,
    colorIdea: "",
    shapeIdea: "",
    generalIdea: "",
    budget: "",
    timeline: ""
  });
  const reviewsData = [
    {
      id: 1,
      name: "\u0410\u043D\u043D\u0430 \u041A.",
      rating: 5,
      text: "\u041D\u0435\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E \u043A\u0440\u0430\u0441\u0438\u0432\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E! \u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u0435\u043A\u043B\u0430 \u043F\u043E\u0442\u0440\u044F\u0441\u0430\u044E\u0449\u0435\u0435, \u043D\u043E\u0441\u0438\u0442\u0441\u044F \u043E\u0447\u0435\u043D\u044C \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E. \u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0430 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E \u043A\u043E\u043C\u043F\u043B\u0438\u043C\u0435\u043D\u0442\u043E\u0432!",
      ring: "\u041B\u0435\u0434\u044F\u043D\u0430\u044F \u043A\u0430\u043F\u043B\u044F",
      date: "2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434"
    },
    {
      id: 2,
      name: "\u041C\u0430\u0440\u0438\u044F \u0414.",
      rating: 5,
      text: "\u0417\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u043B\u0430 \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0441 \u043B\u0443\u043D\u043D\u043E\u0439 \u0442\u0435\u043C\u0430\u0442\u0438\u043A\u043E\u0439. \u041C\u0430\u0441\u0442\u0435\u0440 \u0432\u043E\u043F\u043B\u043E\u0442\u0438\u043B \u0432\u0441\u0435 \u043C\u043E\u0438 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F! \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u0440\u0435\u0432\u0437\u043E\u0448\u0435\u043B \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F.",
      ring: "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437",
      date: "1 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430\u0437\u0430\u0434"
    },
    {
      id: 3,
      name: "\u0415\u043B\u0435\u043D\u0430 \u0421.",
      rating: 5,
      text: "\u0411\u044B\u0441\u0442\u0440\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430, \u043A\u0440\u0430\u0441\u0438\u0432\u0430\u044F \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0430. \u041A\u043E\u043B\u044C\u0446\u043E \u0438\u0437 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438 THORN \u043F\u0440\u043E\u0441\u0442\u043E \u043E\u0433\u043E\u043D\u044C! \u0411\u0443\u0434\u0443 \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0435\u0449\u0435.",
      ring: "\u0422\u0435\u0440\u043D\u043E\u0432\u044B\u0439 \u0448\u0438\u043F",
      date: "3 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434"
    }
  ];
  const customExamplesData = [
    {
      id: 1,
      name: "\u041B\u0443\u043D\u043D\u043E\u0435 \u0441\u0438\u044F\u043D\u0438\u0435",
      description: "\u041A\u043E\u043B\u044C\u0446\u043E \u0441 \u044D\u0444\u0444\u0435\u043A\u0442\u043E\u043C \u043B\u0443\u043D\u043D\u043E\u0433\u043E \u0441\u0432\u0435\u0442\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0441\u0442\u0435\u043A\u043B\u0430",
      clientRequest: "\u0425\u043E\u0442\u0435\u043B\u0430 \u043A\u043E\u043B\u044C\u0446\u043E, \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u044E\u0449\u0435\u0435 \u043B\u0443\u043D\u043D\u044B\u0439 \u0441\u0432\u0435\u0442 \u043D\u0430 \u0432\u043E\u0434\u0435",
      price: "4500\u20BD",
      timeline: "3 \u043D\u0435\u0434\u0435\u043B\u0438",
      image: "assets/custom-moon-ring.jpeg?prompt=Glass%20ring%20with%20moonlight%20effect%20inside%2C%20silver%20blue%20glow%2C%20mystical%20lunar%20jewelry%2C%20ethereal%20glass%20art"
    },
    {
      id: 2,
      name: "\u041E\u0441\u0435\u043D\u043D\u0438\u0439 \u043B\u0438\u0441\u0442",
      description: "\u041A\u043E\u043B\u044C\u0446\u043E \u0441 \u0438\u043C\u0438\u0442\u0430\u0446\u0438\u0435\u0439 \u044F\u043D\u0442\u0430\u0440\u044F \u0438 \u043B\u0438\u0441\u0442\u044C\u0435\u0432 \u0432\u043D\u0443\u0442\u0440\u0438",
      clientRequest: "\u041A\u043E\u043B\u044C\u0446\u043E \u0432 \u043E\u0441\u0435\u043D\u043D\u0438\u0445 \u0442\u043E\u043D\u0430\u0445 \u0441 \u043B\u0438\u0441\u0442\u043E\u0447\u043A\u0430\u043C\u0438",
      price: "3800\u20BD",
      timeline: "2 \u043D\u0435\u0434\u0435\u043B\u0438",
      image: "assets/custom-autumn-ring.jpeg?prompt=Glass%20ring%20with%20autumn%20leaves%20inside%2C%20amber%20orange%20colors%2C%20botanical%20jewelry%2C%20nature%20inspired%20glass%20art"
    },
    {
      id: 3,
      name: "\u0417\u0432\u0435\u0437\u0434\u043D\u0430\u044F \u043F\u044B\u043B\u044C",
      description: "\u041A\u043E\u043B\u044C\u0446\u043E \u0441 \u043C\u0435\u0440\u0446\u0430\u044E\u0449\u0438\u043C\u0438 \u0447\u0430\u0441\u0442\u0438\u0446\u0430\u043C\u0438 \u043A\u0430\u043A \u0437\u0432\u0435\u0437\u0434\u043D\u043E\u0435 \u043D\u0435\u0431\u043E",
      clientRequest: "\u0425\u043E\u0447\u0443 \u043D\u043E\u0441\u0438\u0442\u044C \u043A\u0443\u0441\u043E\u0447\u0435\u043A \u043A\u043E\u0441\u043C\u043E\u0441\u0430 \u043D\u0430 \u043F\u0430\u043B\u044C\u0446\u0435",
      price: "5200\u20BD",
      timeline: "4 \u043D\u0435\u0434\u0435\u043B\u0438",
      image: "assets/custom-star-ring.jpeg?prompt=Glass%20ring%20with%20glittering%20star%20dust%20inside%2C%20cosmic%20sparkles%2C%20deep%20space%20colors%2C%20galaxy%20jewelry%2C%20magical%20glass"
    }
  ];
  const ringsData = [
    {
      id: 1,
      name: "\u041B\u0435\u0434\u044F\u043D\u0430\u044F \u043A\u0430\u043F\u043B\u044F",
      collection: "ICE&DROP",
      price: 2500,
      sizes: ["16", "17", "18", "19"],
      colors: ["\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439", "\u0413\u043E\u043B\u0443\u0431\u043E\u0439"],
      description: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u0435\u043D \u0437\u0430\u043A\u0430\u0437 \u0432 \u043D\u0443\u0436\u043D\u043E\u043C \u0440\u0430\u0437\u043C\u0435\u0440\u0435.",
      images: [
        "assets/ice-drop-ring-main.jpeg?prompt=Elegant%20transparent%20glass%20ring%20with%20ice%20effect%2C%20minimalist%20jewelry%20photography%2C%20studio%20lighting",
        "keys/ice-drop-ring-hand?prompt=Transparent%20glass%20ring%20worn%20on%20elegant%20female%20hand%2C%20natural%20lighting%2C%20lifestyle%20photography",
        "keys/ice-drop-ring-closeup?prompt=Macro%20close-up%20of%20transparent%20glass%20ring%20texture%2C%20ice%20effect%20details%2C%20crystal%20clear"
      ]
    },
    {
      id: 2,
      name: "\u041C\u043E\u0440\u043E\u0437\u043D\u044B\u0439 \u043A\u0440\u0438\u0441\u0442\u0430\u043B\u043B",
      collection: "ICE&DROP",
      price: 3200,
      sizes: ["17", "18", "19", "20"],
      colors: ["\u0411\u0435\u043B\u044B\u0439", "\u0421\u0435\u0440\u0435\u0431\u0440\u0438\u0441\u0442\u044B\u0439"],
      description: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u0435\u043D \u0437\u0430\u043A\u0430\u0437 \u0432 \u043D\u0443\u0436\u043D\u043E\u043C \u0440\u0430\u0437\u043C\u0435\u0440\u0435.",
      images: [
        "assets/frost-crystal-ring-main.jpeg?prompt=Frosted%20glass%20ring%20with%20crystal%20texture%2C%20white%20silver%20colors%2C%20jewelry%20photography%2C%20studio%20setup",
        "assets/frost-crystal-ring-hand.jpeg?prompt=Frosted%20white%20glass%20ring%20on%20hand%2C%20winter%20aesthetic%2C%20natural%20light",
        "keys/frost-crystal-ring-closeup?prompt=Close-up%20macro%20shot%20of%20frosted%20glass%20ring%20texture%2C%20crystal%20pattern%20details"
      ]
    },
    {
      id: 3,
      name: "\u0422\u0435\u0440\u043D\u043E\u0432\u044B\u0439 \u0448\u0438\u043F",
      collection: "THORN",
      price: 2800,
      sizes: ["16", "17", "18"],
      colors: ["\u0427\u0435\u0440\u043D\u044B\u0439", "\u0422\u0435\u043C\u043D\u043E-\u0441\u0435\u0440\u044B\u0439"],
      description: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u0435\u043D \u0437\u0430\u043A\u0430\u0437 \u0432 \u043D\u0443\u0436\u043D\u043E\u043C \u0440\u0430\u0437\u043C\u0435\u0440\u0435.",
      images: [
        "assets/thorn-ring-main.jpeg?prompt=Dark%20glass%20ring%20with%20sharp%20edges%20and%20thorny%20design%2C%20black%20gray%20colors%2C%20dramatic%20lighting",
        "keys/thorn-ring-hand?prompt=Dark%20glass%20ring%20with%20spikes%20worn%20on%20hand%2C%20gothic%20aesthetic%2C%20moody%20photography",
        "keys/thorn-ring-closeup?prompt=Macro%20shot%20of%20dark%20glass%20ring%20sharp%20edges%2C%20thorn%20details%2C%20geometric%20patterns"
      ]
    },
    {
      id: 4,
      name: "\u0420\u043E\u0437\u0430 \u0432\u0435\u0442\u0440\u043E\u0432",
      collection: "THORN",
      price: 3500,
      sizes: ["17", "18", "19"],
      colors: ["\u0411\u043E\u0440\u0434\u043E\u0432\u044B\u0439", "\u0422\u0435\u043C\u043D\u043E-\u0437\u0435\u043B\u0435\u043D\u044B\u0439"],
      description: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u0435\u043D \u0437\u0430\u043A\u0430\u0437 \u0432 \u043D\u0443\u0436\u043D\u043E\u043C \u0440\u0430\u0437\u043C\u0435\u0440\u0435.",
      images: [
        "assets/wind-rose-ring-main.jpeg?prompt=Geometric%20glass%20ring%20with%20burgundy%20dark%20green%20colors%2C%20wind%20rose%20pattern%2C%20artistic%20photography",
        "keys/wind-rose-ring-hand?prompt=Burgundy%20green%20geometric%20glass%20ring%20on%20hand%2C%20autumn%20colors%2C%20elegant%20pose",
        "keys/wind-rose-ring-closeup?prompt=Close-up%20of%20geometric%20glass%20ring%20pattern%2C%20burgundy%20green%20swirls%2C%20detailed%20texture"
      ]
    },
    {
      id: 5,
      name: "\u0410\u0431\u0441\u0442\u0440\u0430\u043A\u0446\u0438\u044F",
      collection: "ART CORE",
      price: 4200,
      sizes: ["16", "17", "18", "19", "20"],
      colors: ["\u041C\u0443\u043B\u044C\u0442\u0438\u043A\u043E\u043B\u043E\u0440", "\u0420\u0430\u0434\u0443\u0436\u043D\u044B\u0439"],
      description: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u0435\u043D \u0437\u0430\u043A\u0430\u0437 \u0432 \u043D\u0443\u0436\u043D\u043E\u043C \u0440\u0430\u0437\u043C\u0435\u0440\u0435.",
      images: [
        "assets/abstract-ring-main.jpeg?prompt=Abstract%20multicolor%20glass%20ring%20with%20rainbow%20patterns%20inside%2C%20artistic%20jewelry%2C%20vibrant%20colors",
        "keys/abstract-ring-hand?prompt=Colorful%20abstract%20glass%20ring%20worn%20on%20hand%2C%20rainbow%20reflections%2C%20artistic%20lifestyle",
        "keys/abstract-ring-closeup?prompt=Macro%20shot%20of%20abstract%20glass%20ring%20internal%20patterns%2C%20rainbow%20swirls%2C%20art%20glass%20details"
      ]
    },
    {
      id: 6,
      name: "\u041A\u043E\u0441\u043C\u043E\u0441",
      collection: "ART CORE",
      price: 3800,
      sizes: ["17", "18", "19"],
      colors: ["\u0421\u0438\u043D\u0438\u0439", "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"],
      description: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u0435\u043D \u0437\u0430\u043A\u0430\u0437 \u0432 \u043D\u0443\u0436\u043D\u043E\u043C \u0440\u0430\u0437\u043C\u0435\u0440\u0435.",
      images: [
        "assets/cosmos-ring-main.jpeg?prompt=Glass%20ring%20with%20starry%20night%20sky%20effect%20inside%2C%20blue%20purple%20colors%2C%20cosmic%20jewelry%2C%20mystical",
        "keys/cosmos-ring-hand?prompt=Cosmic%20blue%20purple%20glass%20ring%20on%20hand%2C%20starry%20effect%2C%20night%20sky%20aesthetic",
        "keys/cosmos-ring-closeup?prompt=Close-up%20of%20cosmic%20glass%20ring%20with%20star%20patterns%2C%20deep%20blue%20purple%20galaxy%20effect"
      ]
    }
  ];
  const collections = ["ICE&DROP", "THORN", "ART CORE"];
  const colors = ["\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439", "\u0413\u043E\u043B\u0443\u0431\u043E\u0439", "\u0411\u0435\u043B\u044B\u0439", "\u0421\u0435\u0440\u0435\u0431\u0440\u0438\u0441\u0442\u044B\u0439", "\u0427\u0435\u0440\u043D\u044B\u0439", "\u0422\u0435\u043C\u043D\u043E-\u0441\u0435\u0440\u044B\u0439", "\u0411\u043E\u0440\u0434\u043E\u0432\u044B\u0439", "\u0422\u0435\u043C\u043D\u043E-\u0437\u0435\u043B\u0435\u043D\u044B\u0439", "\u041C\u0443\u043B\u044C\u0442\u0438\u043A\u043E\u043B\u043E\u0440", "\u0420\u0430\u0434\u0443\u0436\u043D\u044B\u0439", "\u0421\u0438\u043D\u0438\u0439", "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"];
  const sizes = ["16", "17", "18", "19", "20"];
  const priceRanges = [
    { label: "\u0414\u043E 3000\u20BD", value: "0-3000" },
    { label: "3000-4000\u20BD", value: "3000-4000" },
    { label: "\u041E\u0442 4000\u20BD", value: "4000-99999" }
  ];
  useEffect(() => {
    let filtered = ringsData;
    if (selectedFilters.collection) {
      filtered = filtered.filter((ring) => ring.collection === selectedFilters.collection);
    }
    if (selectedFilters.color) {
      filtered = filtered.filter((ring) => ring.colors.includes(selectedFilters.color));
    }
    if (selectedFilters.size) {
      filtered = filtered.filter((ring) => ring.sizes.includes(selectedFilters.size));
    }
    if (selectedFilters.priceRange) {
      const [min, max] = selectedFilters.priceRange.split("-").map(Number);
      filtered = filtered.filter((ring) => ring.price >= min && ring.price <= max);
    }
    setFilteredRings(filtered);
  }, [selectedFilters]);
  useEffect(() => {
    setFilteredRings(ringsData);
    const initialImageIndices = {};
    ringsData.forEach((ring) => {
      initialImageIndices[ring.id] = 0;
    });
    setSelectedImageIndex(initialImageIndices);
  }, []);
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value
    }));
  };
  const clearFilters = () => {
    setSelectedFilters({
      collection: "",
      color: "",
      size: "",
      priceRange: ""
    });
  };
  const handleImageChange = (ringId, imageIndex) => {
    setSelectedImageIndex((prev) => ({
      ...prev,
      [ringId]: imageIndex
    }));
  };
  const handleOrder = (ring) => {
    setOrderForm({
      isOpen: true,
      ring,
      selectedSize: ring.sizes[0] || "",
      selectedColor: ring.colors[0] || "",
      comment: ""
    });
  };
  const closeOrderForm = () => {
    setOrderForm({
      isOpen: false,
      ring: null,
      selectedSize: "",
      selectedColor: "",
      comment: ""
    });
  };
  const handleOrderSubmit = () => {
    const { ring, selectedSize, selectedColor, comment } = orderForm;
    let message = `\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0425\u043E\u0447\u0443 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043E\u043B\u044C\u0446\u043E:

\u{1F4CD} \u0422\u043E\u0432\u0430\u0440: ${ring.name} (${ring.collection})
\u{1F4B0} \u0426\u0435\u043D\u0430: ${ring.price}\u20BD
\u{1F4CF} \u0420\u0430\u0437\u043C\u0435\u0440: ${selectedSize}
\u{1F3A8} \u0426\u0432\u0435\u0442: ${selectedColor}`;
    if (comment.trim()) {
      message += `
\u{1F4AC} \u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439: ${comment}`;
    }
    message += `

\u{1F517} \u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0442\u043E\u0432\u0430\u0440: drip-bloom.ru/ring/${ring.id}`;
    alert(`\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u0443!

${message}`);
    closeOrderForm();
  };
  const openCustomOrderForm = () => {
    setCustomOrderForm({
      isOpen: true,
      colorIdea: "",
      shapeIdea: "",
      generalIdea: "",
      budget: "",
      timeline: ""
    });
  };
  const closeCustomOrderForm = () => {
    setCustomOrderForm({
      isOpen: false,
      colorIdea: "",
      shapeIdea: "",
      generalIdea: "",
      budget: "",
      timeline: ""
    });
  };
  const handleCustomOrderSubmit = () => {
    const { colorIdea, shapeIdea, generalIdea, budget, timeline } = customOrderForm;
    let message = `\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0425\u043E\u0447\u0443 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E:

\u{1F3A8} \u0426\u0432\u0435\u0442 \u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B: ${colorIdea || "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E"}

\u{1F537} \u0424\u043E\u0440\u043C\u0430 \u0438 \u0434\u0438\u0437\u0430\u0439\u043D: ${shapeIdea || "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E"}

\u{1F4A1} \u041E\u0431\u0449\u0430\u044F \u0438\u0434\u0435\u044F: ${generalIdea || "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E"}`;
    if (budget) {
      message += `
\u{1F4B0} \u041F\u0440\u0438\u043C\u0435\u0440\u043D\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442: ${budget}`;
    }
    if (timeline) {
      message += `
\u23F0 \u0416\u0435\u043B\u0430\u0435\u043C\u044B\u0435 \u0441\u0440\u043E\u043A\u0438: ${timeline}`;
    }
    message += `

\u{1F6E0}\uFE0F \u0422\u0438\u043F \u0437\u0430\u043A\u0430\u0437\u0430: \u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435
\u{1F4DE} \u041F\u0440\u043E\u0448\u0443 \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0434\u043B\u044F \u043E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439`;
    alert(`\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D!

${message}`);
    closeCustomOrderForm();
  };
  const CatalogPage = () => /* @__PURE__ */ React.createElement("div", { className: "min-h-screen", style: { backgroundColor: "#FAFAFA" } }, /* @__PURE__ */ React.createElement(
    "header",
    {
      className: "backdrop-blur-sm sticky top-0 z-10 border-b",
      style: {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 246, 0.9) 50%, rgba(252, 250, 248, 0.95) 100%)",
        borderColor: "rgba(238, 193, 229, 0.15)",
        boxShadow: "0 4px 32px rgba(238, 193, 229, 0.08)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-8 py-10" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-extralight tracking-wide mb-1", style: { color: "#6B4C57" } }, "Drip Bloom"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#8B7355" } }, "\u0421\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u044B\u0435 \u043A\u043E\u043B\u044C\u0446\u0430 \u0440\u0443\u0447\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B")))
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "backdrop-blur-sm border-b",
      style: {
        background: "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(252, 250, 248, 0.85) 50%, rgba(250, 248, 246, 0.9) 100%)",
        borderColor: "rgba(238, 193, 229, 0.12)",
        boxShadow: "0 2px 16px rgba(238, 193, 229, 0.04)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-8 py-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: "font-light", style: { color: "#6B4C57" } }, "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: clearFilters,
        className: "text-sm font-light transition-colors",
        style: { color: "#EEC1E5" },
        onMouseOver: (e) => e.target.style.color = "#E8A5C1",
        onMouseOut: (e) => e.target.style.color = "#EEC1E5"
      },
      "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C"
    )), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3 font-light tracking-wider", style: { color: "#8B7355" } }, "\u041A\u041E\u041B\u041B\u0415\u041A\u0426\u0418\u0418"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, collections.map((collection) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: collection,
        onClick: () => handleFilterChange("collection", collection),
        className: "px-5 py-3 rounded-2xl text-xs transition-all duration-500 ease-in-out transform hover:scale-105 font-light shadow-sm",
        style: {
          backgroundColor: selectedFilters.collection === collection ? "#F8F3F6" : "#FEFEFE",
          color: selectedFilters.collection === collection ? "#6B4C57" : "#8B7355",
          transform: selectedFilters.collection === collection ? "scale(1.05)" : "scale(1)",
          boxShadow: selectedFilters.collection === collection ? "0 12px 32px rgba(238, 193, 229, 0.3)" : "0 4px 16px rgba(238, 193, 229, 0.1)",
          border: selectedFilters.collection === collection ? "1px solid rgba(238, 193, 229, 0.3)" : "1px solid rgba(238, 193, 229, 0.1)"
        },
        onMouseOver: (e) => {
          if (selectedFilters.collection !== collection) {
            e.target.style.backgroundColor = "rgba(246, 231, 239, 0.4)";
            e.target.style.boxShadow = "0 8px 24px rgba(238, 193, 229, 0.2)";
            e.target.style.borderColor = "rgba(238, 193, 229, 0.2)";
          }
        },
        onMouseOut: (e) => {
          if (selectedFilters.collection !== collection) {
            e.target.style.backgroundColor = "#FAFAFA";
            e.target.style.boxShadow = "0 4px 16px rgba(238, 193, 229, 0.1)";
            e.target.style.borderColor = "rgba(238, 193, 229, 0.1)";
          }
        }
      },
      collection
    )))), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3 font-light tracking-wider", style: { color: "#8B7355" } }, "\u0426\u0415\u041D\u0410"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, priceRanges.map((range) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: range.value,
        onClick: () => handleFilterChange("priceRange", range.value),
        className: "px-5 py-3 rounded-2xl text-xs transition-all duration-500 ease-in-out transform hover:scale-105 font-light shadow-sm",
        style: {
          backgroundColor: selectedFilters.priceRange === range.value ? "#F0F8F4" : "#FEFEFE",
          color: selectedFilters.priceRange === range.value ? "#2D5A3D" : "#8B7355",
          transform: selectedFilters.priceRange === range.value ? "scale(1.05)" : "scale(1)",
          boxShadow: selectedFilters.priceRange === range.value ? "0 12px 32px rgba(215, 246, 226, 0.4)" : "0 4px 16px rgba(238, 193, 229, 0.1)",
          border: selectedFilters.priceRange === range.value ? "1px solid rgba(215, 246, 226, 0.4)" : "1px solid rgba(238, 193, 229, 0.1)"
        },
        onMouseOver: (e) => {
          if (selectedFilters.priceRange !== range.value) {
            e.target.style.backgroundColor = "rgba(215, 246, 226, 0.4)";
            e.target.style.boxShadow = "0 8px 24px rgba(215, 246, 226, 0.3)";
            e.target.style.borderColor = "rgba(215, 246, 226, 0.3)";
          }
        },
        onMouseOut: (e) => {
          if (selectedFilters.priceRange !== range.value) {
            e.target.style.backgroundColor = "#FAFAFA";
            e.target.style.boxShadow = "0 4px 16px rgba(238, 193, 229, 0.1)";
            e.target.style.borderColor = "rgba(238, 193, 229, 0.1)";
          }
        }
      },
      range.label
    )))), /* @__PURE__ */ React.createElement("div", { className: "mb-2" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3 font-light tracking-wider", style: { color: "#8B7355" } }, "\u0420\u0410\u0417\u041C\u0415\u0420"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, sizes.map((size) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: size,
        onClick: () => handleFilterChange("size", size),
        className: "px-5 py-3 rounded-2xl text-xs transition-all duration-500 ease-in-out transform hover:scale-105 font-light shadow-sm",
        style: {
          backgroundColor: selectedFilters.size === size ? "#FAF8F5" : "#FEFEFE",
          color: selectedFilters.size === size ? "#6B4C57" : "#8B7355",
          transform: selectedFilters.size === size ? "scale(1.05)" : "scale(1)",
          boxShadow: selectedFilters.size === size ? "0 12px 32px rgba(238, 193, 229, 0.3)" : "0 4px 16px rgba(238, 193, 229, 0.1)",
          border: selectedFilters.size === size ? "1px solid rgba(238, 193, 229, 0.3)" : "1px solid rgba(238, 193, 229, 0.1)"
        },
        onMouseOver: (e) => {
          if (selectedFilters.size !== size) {
            e.target.style.backgroundColor = "rgba(247, 244, 239, 0.6)";
            e.target.style.boxShadow = "0 8px 24px rgba(238, 193, 229, 0.2)";
            e.target.style.borderColor = "rgba(238, 193, 229, 0.2)";
          }
        },
        onMouseOut: (e) => {
          if (selectedFilters.size !== size) {
            e.target.style.backgroundColor = "#FAFAFA";
            e.target.style.boxShadow = "0 4px 16px rgba(238, 193, 229, 0.1)";
            e.target.style.borderColor = "rgba(238, 193, 229, 0.1)";
          }
        }
      },
      size
    )))))
  ), /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-6 py-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm mb-6 font-light", style: { color: "#8B7355" } }, "\u041D\u0430\u0439\u0434\u0435\u043D\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432: ", filteredRings.length), /* @__PURE__ */ React.createElement("div", { className: "space-y-12" }, filteredRings.map((ring) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: ring.id,
      className: "backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-700 ease-out transform hover:scale-[1.02]",
      style: {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(252, 250, 248, 0.95) 100%)",
        boxShadow: "0 16px 48px rgba(238, 193, 229, 0.12)",
        border: "1px solid rgba(238, 193, 229, 0.08)",
        backdropFilter: "blur(20px)"
      },
      onMouseOver: (e) => {
        e.currentTarget.style.boxShadow = "0 24px 64px rgba(238, 193, 229, 0.25)";
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 231, 239, 0.4) 100%)";
      },
      onMouseOut: (e) => {
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(238, 193, 229, 0.15)";
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 244, 239, 0.6) 100%)";
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "aspect-square flex items-center justify-center relative overflow-hidden",
        style: {
          background: `linear-gradient(135deg, #FFFFFF 0%, #F7F4EF 50%, #F6E7EF 100%)`
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "absolute inset-0 opacity-30",
          style: {
            background: `radial-gradient(circle at 30% 30%, rgba(238, 193, 229, 0.3) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 70%, rgba(215, 246, 226, 0.2) 0%, transparent 50%)`
          }
        }
      ),
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: ring.images[selectedImageIndex[ring.id] || 0],
          alt: ring.name,
          className: "w-full h-full object-cover relative z-10",
          style: {
            filter: "drop-shadow(0 12px 24px rgba(238, 193, 229, 0.2))"
          }
        }
      ),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "absolute bottom-0 left-0 right-0 h-1/3 opacity-20 z-0",
          style: {
            background: `linear-gradient(to top, rgba(238, 193, 229, 0.2) 0%, transparent 100%)`,
            filter: "blur(12px)"
          }
        }
      )
    ), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2" }, ring.images.map((_, index) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: index,
        onClick: () => handleImageChange(ring.id, index),
        className: `w-2 h-2 rounded-full transition-all duration-500 ease-in-out transform hover:scale-125 ${(selectedImageIndex[ring.id] || 0) === index ? "bg-white shadow-md scale-110" : "bg-white/40 hover:bg-white/80"}`
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 right-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-black/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full" }, (selectedImageIndex[ring.id] || 0) === 0 ? "\u041E\u0431\u0449\u0438\u0439 \u0432\u0438\u0434" : (selectedImageIndex[ring.id] || 0) === 1 ? "\u041D\u0430 \u0440\u0443\u043A\u0435" : "\u041A\u0440\u0443\u043F\u043D\u044B\u0439 \u043F\u043B\u0430\u043D"))),
    /* @__PURE__ */ React.createElement("div", { className: "p-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-light text-xl mb-1", style: { color: "#5A3D47" } }, ring.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light tracking-wide", style: { color: "#7A634A" } }, ring.collection)), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-extralight", style: { color: "#5A3D47" } }, ring.price, "\u20BD")), /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-5 leading-relaxed font-light", style: { color: "#7A634A" } }, ring.description), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light tracking-wider mb-3", style: { color: "#7A634A" } }, "\u0420\u0410\u0417\u041C\u0415\u0420\u042B \u0412 \u041D\u0410\u041B\u0418\u0427\u0418\u0418"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, ring.sizes.map((size) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: size,
        className: "px-3 py-1 rounded-lg text-xs font-light",
        style: {
          backgroundColor: "#FAF8F5",
          color: "#5A3D47",
          border: "1px solid rgba(238, 193, 229, 0.15)"
        }
      },
      size
    )))), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light tracking-wider mb-3", style: { color: "#7A634A" } }, "\u0426\u0412\u0415\u0422\u0410"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, ring.colors.map((color) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: color,
        className: "px-3 py-1 rounded-lg text-xs font-light",
        style: {
          backgroundColor: "#F0F8F4",
          color: "#2D5A3D",
          border: "1px solid rgba(215, 246, 226, 0.3)"
        }
      },
      color
    )))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleOrder(ring),
        className: "w-full py-4 rounded-2xl text-sm font-light transition-all duration-500 ease-out transform hover:scale-[1.02]",
        style: {
          background: "linear-gradient(135deg, #F8E8F5 0%, #F0D4EC 100%)",
          color: "#5A3D47",
          boxShadow: "0 12px 32px rgba(238, 193, 229, 0.25)",
          border: "1px solid rgba(238, 193, 229, 0.15)"
        },
        onMouseOver: (e) => {
          e.target.style.backgroundColor = "#E8A5C1";
          e.target.style.boxShadow = "0 16px 48px rgba(238, 193, 229, 0.4)";
          e.target.style.borderColor = "rgba(238, 193, 229, 0.3)";
        },
        onMouseOut: (e) => {
          e.target.style.backgroundColor = "#EEC1E5";
          e.target.style.boxShadow = "0 12px 32px rgba(238, 193, 229, 0.3)";
          e.target.style.borderColor = "rgba(238, 193, 229, 0.2)";
        }
      },
      "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043E\u043B\u044C\u0446\u043E"
    ))
  )))), /* @__PURE__ */ React.createElement(
    "nav",
    {
      className: "fixed bottom-0 left-0 right-0 backdrop-blur-sm border-t",
      style: {
        background: "linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(252, 250, 248, 0.9) 100%)",
        borderColor: "rgba(238, 193, 229, 0.12)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 -8px 32px rgba(238, 193, 229, 0.08)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-4 py-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-around" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCurrentPage("catalog"),
        className: "flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110",
        style: {
          color: currentPage === "catalog" ? "#5A3D47" : "#8B7355",
          transform: currentPage === "catalog" ? "scale(1.05)" : "scale(1)"
        },
        onMouseOver: (e) => {
          if (currentPage !== "catalog") {
            e.currentTarget.style.color = "#8B5A6B";
          }
        },
        onMouseOut: (e) => {
          if (currentPage !== "catalog") {
            e.currentTarget.style.color = "#B8A8C0";
          }
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F6CD}\uFE0F"),
      /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCurrentPage("reviews"),
        className: "flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110",
        style: {
          color: currentPage === "reviews" ? "#8B5A6B" : "#B8A8C0",
          transform: currentPage === "reviews" ? "scale(1.05)" : "scale(1)"
        },
        onMouseOver: (e) => {
          if (currentPage !== "reviews") {
            e.currentTarget.style.color = "#8B5A6B";
          }
        },
        onMouseOut: (e) => {
          if (currentPage !== "reviews") {
            e.currentTarget.style.color = "#B8A8C0";
          }
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F4AC}"),
      /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u041E\u0442\u0437\u044B\u0432\u044B")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCurrentPage("delivery"),
        className: "flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110",
        style: {
          color: currentPage === "delivery" ? "#8B5A6B" : "#B8A8C0",
          transform: currentPage === "delivery" ? "scale(1.05)" : "scale(1)"
        },
        onMouseOver: (e) => {
          if (currentPage !== "delivery") {
            e.currentTarget.style.color = "#8B5A6B";
          }
        },
        onMouseOut: (e) => {
          if (currentPage !== "delivery") {
            e.currentTarget.style.color = "#B8A8C0";
          }
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F69A}"),
      /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430")
    )))
  ), /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-20 right-6 z-40" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: openCustomOrderForm,
      className: "px-6 py-4 rounded-full transition-all duration-500 ease-out transform hover:scale-105 flex items-center gap-3 font-light",
      style: {
        background: "linear-gradient(135deg, #D7F6E2 0%, #EEC1E5 100%)",
        color: "#8B5A6B",
        boxShadow: "0 16px 48px rgba(238, 193, 229, 0.3)",
        border: "1px solid rgba(238, 193, 229, 0.2)"
      },
      onMouseOver: (e) => {
        e.target.style.background = "linear-gradient(135deg, #C8F2D6 0%, #E8A5C1 100%)";
        e.target.style.boxShadow = "0 20px 64px rgba(238, 193, 229, 0.4)";
        e.target.style.borderColor = "rgba(238, 193, 229, 0.3)";
      },
      onMouseOut: (e) => {
        e.target.style.background = "linear-gradient(135deg, #D7F6E2 0%, #EEC1E5 100%)";
        e.target.style.boxShadow = "0 16px 48px rgba(238, 193, 229, 0.3)";
        e.target.style.borderColor = "rgba(238, 193, 229, 0.2)";
      }
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "\u2728"),
    /* @__PURE__ */ React.createElement("span", { className: "text-sm font-light" }, "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435")
  )), /* @__PURE__ */ React.createElement("div", { className: "h-20" }));
  const ReviewsPage = () => /* @__PURE__ */ React.createElement("div", { className: "min-h-screen", style: { backgroundColor: "#FAFAFA" } }, /* @__PURE__ */ React.createElement(
    "header",
    {
      className: "backdrop-blur-sm sticky top-0 z-10 border-b",
      style: {
        background: "linear-gradient(135deg, rgba(215, 246, 226, 0.8) 0%, rgba(246, 231, 239, 0.8) 100%)",
        borderColor: "rgba(238, 193, 229, 0.2)",
        boxShadow: "0 4px 32px rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-6 py-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-extralight tracking-wide mb-1", style: { color: "#5A3D47" } }, "Drip Bloom"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#7A634A" } }, "\u041E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432")))
  ), /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-6 py-6" }, /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-extralight mb-6", style: { color: "#5A3D47" } }, "\u{1F4AC} \u041E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 mb-8" }, reviewsData.map((review) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: review.id,
      className: "backdrop-blur-sm rounded-2xl p-6",
      style: {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)",
        boxShadow: "0 8px 24px rgba(238, 193, 229, 0.1)",
        border: "1px solid rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-light", style: { color: "#8B5A6B" } }, review.name), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 mt-1" }, [...Array(review.rating)].map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "text-amber-400 text-sm" }, "\u2B50")))), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light", style: { color: "#B8A8C0" } }, review.date)),
    /* @__PURE__ */ React.createElement("p", { className: "text-sm leading-relaxed mb-3 font-light", style: { color: "#B8A8C0" } }, review.text),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light", style: { color: "#B8A8C0" } }, "\u0422\u043E\u0432\u0430\u0440:"), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light", style: { color: "#4A7C59" } }, review.ring))
  )))), /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-extralight mb-6", style: { color: "#8B5A6B" } }, "\u2728 \u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432"), /* @__PURE__ */ React.createElement("div", { className: "space-y-6 mb-8" }, customExamplesData.map((example) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: example.id,
      className: "backdrop-blur-sm rounded-2xl overflow-hidden",
      style: {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)",
        boxShadow: "0 8px 24px rgba(238, 193, 229, 0.1)",
        border: "1px solid rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "aspect-square flex items-center justify-center",
        style: {
          background: `linear-gradient(135deg, #FFFFFF 0%, #F7F4EF 50%, #F6E7EF 100%)`
        }
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: example.image,
          alt: example.name,
          className: "w-full h-full object-cover"
        }
      )
    ),
    /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-light text-lg", style: { color: "#8B5A6B" } }, example.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm mt-1 font-light", style: { color: "#B8A8C0" } }, example.description)), /* @__PURE__ */ React.createElement("span", { className: "text-lg font-extralight", style: { color: "#8B5A6B" } }, example.price)), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "p-4 rounded-xl mb-4",
        style: { backgroundColor: "#F6E7EF" }
      },
      /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light tracking-wider mb-1", style: { color: "#B8A8C0" } }, "\u041F\u041E\u0416\u0415\u041B\u0410\u041D\u0418\u0415 \u041A\u041B\u0418\u0415\u041D\u0422\u0410"),
      /* @__PURE__ */ React.createElement("p", { className: "text-sm italic font-light", style: { color: "#8B5A6B" } }, '"', example.clientRequest, '"')
    ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs", style: { color: "#B8A8C0" } }, /* @__PURE__ */ React.createElement("span", { className: "font-light" }, "\u23F0 \u0421\u0440\u043E\u043A \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u044F: ", example.timeline), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: openCustomOrderForm,
        className: "font-light transition-colors",
        style: { color: "#EEC1E5" },
        onMouseOver: (e) => e.target.style.color = "#E8A5C1",
        onMouseOut: (e) => e.target.style.color = "#EEC1E5"
      },
      "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u0445\u043E\u0436\u0435\u0435 \u2192"
    )))
  ))), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "rounded-2xl p-6",
      style: { backgroundColor: "#F6E7EF" }
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl mb-3 block" }, "\u2728"), /* @__PURE__ */ React.createElement("h3", { className: "font-light mb-2", style: { color: "#8B5A6B" } }, "\u0415\u0441\u0442\u044C \u0441\u0432\u043E\u044F \u0438\u0434\u0435\u044F?"), /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-4 leading-relaxed font-light", style: { color: "#B8A8C0" } }, "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0432\u0438\u0434\u0435\u043D\u0438\u0435 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043B\u044C\u0446\u0430, \u0438 \u043C\u044B \u0432\u043E\u043F\u043B\u043E\u0442\u0438\u043C \u0435\u0433\u043E \u0432 \u0441\u0442\u0435\u043A\u043B\u0435"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: openCustomOrderForm,
        className: "px-6 py-3 rounded-xl text-sm font-light transition-all duration-300 shadow-sm",
        style: {
          backgroundColor: "#EEC1E5",
          color: "#8B5A6B",
          border: "1px solid rgba(238, 193, 229, 0.2)"
        },
        onMouseOver: (e) => {
          e.target.style.backgroundColor = "#E8A5C1";
        },
        onMouseOut: (e) => {
          e.target.style.backgroundColor = "#EEC1E5";
        }
      },
      "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E"
    ))
  ))), /* @__PURE__ */ React.createElement(
    "nav",
    {
      className: "fixed bottom-0 left-0 right-0 backdrop-blur-sm border-t",
      style: {
        background: "linear-gradient(to top, rgba(215, 246, 226, 0.9) 0%, rgba(246, 231, 239, 0.8) 100%)",
        borderColor: "rgba(238, 193, 229, 0.2)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 -8px 32px rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-4 py-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-around" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCurrentPage("catalog"),
        className: "flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110",
        style: {
          color: currentPage === "catalog" ? "#8B5A6B" : "#B8A8C0",
          transform: currentPage === "catalog" ? "scale(1.05)" : "scale(1)"
        },
        onMouseOver: (e) => {
          if (currentPage !== "catalog") {
            e.currentTarget.style.color = "#8B5A6B";
          }
        },
        onMouseOut: (e) => {
          if (currentPage !== "catalog") {
            e.currentTarget.style.color = "#B8A8C0";
          }
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F6CD}\uFE0F"),
      /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCurrentPage("reviews"),
        className: "flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110",
        style: {
          color: currentPage === "reviews" ? "#8B5A6B" : "#B8A8C0",
          transform: currentPage === "reviews" ? "scale(1.05)" : "scale(1)"
        },
        onMouseOver: (e) => {
          if (currentPage !== "reviews") {
            e.currentTarget.style.color = "#8B5A6B";
          }
        },
        onMouseOut: (e) => {
          if (currentPage !== "reviews") {
            e.currentTarget.style.color = "#B8A8C0";
          }
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F4AC}"),
      /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u041E\u0442\u0437\u044B\u0432\u044B")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCurrentPage("delivery"),
        className: "flex flex-col items-center py-3 px-4 transition-all duration-500 ease-in-out transform hover:scale-110",
        style: {
          color: currentPage === "delivery" ? "#8B5A6B" : "#B8A8C0",
          transform: currentPage === "delivery" ? "scale(1.05)" : "scale(1)"
        },
        onMouseOver: (e) => {
          if (currentPage !== "delivery") {
            e.currentTarget.style.color = "#8B5A6B";
          }
        },
        onMouseOut: (e) => {
          if (currentPage !== "delivery") {
            e.currentTarget.style.color = "#B8A8C0";
          }
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F69A}"),
      /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430")
    )))
  ), /* @__PURE__ */ React.createElement("div", { className: "h-20" }));
  const DeliveryPage = () => /* @__PURE__ */ React.createElement("div", { className: "min-h-screen", style: { backgroundColor: "#FAFAFA" } }, /* @__PURE__ */ React.createElement(
    "header",
    {
      className: "backdrop-blur-sm border-b",
      style: {
        background: "linear-gradient(135deg, rgba(215, 246, 226, 0.8) 0%, rgba(246, 231, 239, 0.8) 100%)",
        borderColor: "rgba(238, 193, 229, 0.2)",
        boxShadow: "0 4px 32px rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-6 py-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-4" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-extralight tracking-wide mb-1", style: { color: "#8B5A6B" } }, "Drip Bloom")), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-extralight", style: { color: "#8B5A6B" } }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0438 \u043E\u043F\u043B\u0430\u0442\u0430"))
  ), /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-6 py-6" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "backdrop-blur-sm rounded-2xl p-6 mb-6",
      style: {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)",
        boxShadow: "0 8px 24px rgba(238, 193, 229, 0.1)",
        border: "1px solid rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-extralight mb-5", style: { color: "#8B5A6B" } }, "\u{1F69A} \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"),
    /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-light mb-3", style: { color: "#8B5A6B" } }, "\u041F\u043E \u041C\u043E\u0441\u043A\u0432\u0435"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#B8A8C0" } }, "\u2022 \u041A\u0443\u0440\u044C\u0435\u0440\u0441\u043A\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430 - 300\u20BD"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#B8A8C0" } }, "\u2022 \u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437 - \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E"), /* @__PURE__ */ React.createElement("p", { className: "text-sm mt-2 font-light", style: { color: "#B8A8C0" } }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 1-2 \u0434\u043D\u0435\u0439")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-light mb-3", style: { color: "#8B5A6B" } }, "\u041F\u043E \u0420\u043E\u0441\u0441\u0438\u0438"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#B8A8C0" } }, "\u2022 \u041F\u043E\u0447\u0442\u0430 \u0420\u043E\u0441\u0441\u0438\u0438 - \u043E\u0442 250\u20BD"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#B8A8C0" } }, "\u2022 \u0421\u0414\u042D\u041A - \u043E\u0442 350\u20BD"), /* @__PURE__ */ React.createElement("p", { className: "text-sm mt-2 font-light", style: { color: "#B8A8C0" } }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 3-7 \u0434\u043D\u0435\u0439")), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "p-4 rounded-xl",
        style: { backgroundColor: "#D7F6E2" }
      },
      /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#4A7C59" } }, "\u{1F48E} \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043A\u0430\u0437\u0435 \u043E\u0442 5000\u20BD")
    ))
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "backdrop-blur-sm rounded-2xl p-6 mb-6",
      style: {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)",
        boxShadow: "0 8px 24px rgba(238, 193, 229, 0.1)",
        border: "1px solid rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-extralight mb-5", style: { color: "#8B5A6B" } }, "\u{1F4B3} \u041E\u043F\u043B\u0430\u0442\u0430"),
    /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg mr-3" }, "\u{1F4B3}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#8B5A6B" } }, "\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430"), /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light", style: { color: "#B8A8C0" } }, "Visa, MasterCard, \u041C\u0418\u0420"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg mr-3" }, "\u{1F4F1}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#8B5A6B" } }, "\u0421\u0411\u041F"), /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light", style: { color: "#B8A8C0" } }, "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0431\u044B\u0441\u0442\u0440\u044B\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg mr-3" }, "\u{1F4B0}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#8B5A6B" } }, "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438"), /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light", style: { color: "#B8A8C0" } }, "\u041F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 (\u0442\u043E\u043B\u044C\u043A\u043E \u041C\u043E\u0441\u043A\u0432\u0430)"))))
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "backdrop-blur-sm rounded-2xl p-6 mb-6",
      style: {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)",
        boxShadow: "0 8px 24px rgba(238, 193, 229, 0.1)",
        border: "1px solid rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-extralight mb-5", style: { color: "#8B5A6B" } }, "\u{1F6E1}\uFE0F \u0413\u0430\u0440\u0430\u043D\u0442\u0438\u0438"),
    /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg mr-3 mt-0.5" }, "\u2728"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#8B5A6B" } }, "\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E"), /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light leading-relaxed", style: { color: "#B8A8C0" } }, "\u041A\u0430\u0436\u0434\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0438\u0437\u0433\u043E\u0442\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0438\u0437 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0441\u0442\u0435\u043A\u043B\u0430"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg mr-3 mt-0.5" }, "\u{1F504}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#8B5A6B" } }, "\u041E\u0431\u043C\u0435\u043D \u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0442"), /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light leading-relaxed", style: { color: "#B8A8C0" } }, "14 \u0434\u043D\u0435\u0439 \u043D\u0430 \u043E\u0431\u043C\u0435\u043D, \u0435\u0441\u043B\u0438 \u0440\u0430\u0437\u043C\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u043E\u0448\u0435\u043B"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg mr-3 mt-0.5" }, "\u{1F4E6}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#8B5A6B" } }, "\u0423\u043F\u0430\u043A\u043E\u0432\u043A\u0430"), /* @__PURE__ */ React.createElement("p", { className: "text-xs font-light leading-relaxed", style: { color: "#B8A8C0" } }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0430 \u0438 \u043F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043A\u043E\u0440\u043E\u0431\u043E\u0447\u043A\u0430"))))
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "backdrop-blur-sm rounded-2xl p-6",
      style: {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 239, 0.5) 100%)",
        boxShadow: "0 8px 24px rgba(238, 193, 229, 0.1)",
        border: "1px solid rgba(238, 193, 229, 0.1)"
      }
    },
    /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-extralight mb-5", style: { color: "#8B5A6B" } }, "\u{1F4DE} \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"),
    /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#B8A8C0" } }, "Telegram: @dripbloom_shop"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#B8A8C0" } }, "Instagram: @drip.bloom.rings"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-light", style: { color: "#B8A8C0" } }, "\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B: 10:00 - 20:00"))
  )), /* @__PURE__ */ React.createElement("nav", { className: "fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-stone-100" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto px-4 py-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-around" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setCurrentPage("catalog"),
      className: `flex flex-col items-center py-3 px-4 transition-colors duration-300 ${currentPage === "catalog" ? "text-rose-500" : "text-stone-400 hover:text-stone-600"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F6CD}\uFE0F"),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setCurrentPage("reviews"),
      className: `flex flex-col items-center py-3 px-4 transition-colors duration-300 ${currentPage === "reviews" ? "text-rose-500" : "text-stone-400 hover:text-stone-600"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F4AC}"),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u041E\u0442\u0437\u044B\u0432\u044B")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setCurrentPage("delivery"),
      className: `flex flex-col items-center py-3 px-4 transition-colors duration-300 ${currentPage === "delivery" ? "text-rose-500" : "text-stone-400 hover:text-stone-600"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-xl mb-1" }, "\u{1F69A}"),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs font-light" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430")
  )))), /* @__PURE__ */ React.createElement("div", { className: "h-20" }));
  const OrderFormModal = () => {
    if (!orderForm.isOpen || !orderForm.ring) return null;
    const { ring } = orderForm;
    return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-center p-4" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "backdrop-blur-sm rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-y-auto",
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          boxShadow: "0 -8px 32px rgba(246, 231, 239, 0.3)",
          border: "1px solid rgba(247, 244, 239, 0.2)"
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "sticky top-0 backdrop-blur-sm border-b p-8 rounded-t-3xl",
          style: {
            backgroundColor: "rgba(247, 244, 239, 0.98)",
            borderColor: "rgba(247, 244, 239, 0.3)"
          }
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-light text-stone-800" }, "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437"), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: closeOrderForm,
            className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-all duration-300 ease-in-out transform hover:scale-110"
          },
          /* @__PURE__ */ React.createElement("span", { className: "text-stone-400" }, "\u2715")
        )),
        /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-stone-50 to-rose-50 flex-shrink-0" }, /* @__PURE__ */ React.createElement(
          "img",
          {
            src: ring.images[0],
            alt: ring.name,
            className: "w-full h-full object-cover"
          }
        )), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("h4", { className: "font-light text-stone-800" }, ring.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-stone-500 font-light" }, ring.collection), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-extralight text-stone-700" }, ring.price, "\u20BD")))
      ),
      /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-light text-stone-700 mb-3" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, ring.sizes.map((size) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: size,
          onClick: () => setOrderForm((prev) => ({ ...prev, selectedSize: size })),
          className: `px-4 py-2 rounded-xl transition-all duration-400 ease-in-out transform hover:scale-105 ${orderForm.selectedSize === size ? "bg-rose-100 text-rose-600 shadow-md scale-105" : "bg-stone-100 text-stone-600 hover:bg-rose-50 hover:shadow-sm"}`
        },
        size
      )))), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-light text-stone-700 mb-3" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, ring.colors.map((color) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: color,
          onClick: () => setOrderForm((prev) => ({ ...prev, selectedColor: color })),
          className: `px-4 py-2 rounded-xl transition-all duration-400 ease-in-out transform hover:scale-105 ${orderForm.selectedColor === color ? "bg-emerald-100 text-emerald-600 shadow-md scale-105" : "bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:shadow-sm"}`
        },
        color
      )))), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-light text-stone-700 mb-3" }, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0437\u0430\u043A\u0430\u0437\u0443"), /* @__PURE__ */ React.createElement(
        "textarea",
        {
          value: orderForm.comment,
          onChange: (e) => setOrderForm((prev) => ({ ...prev, comment: e.target.value })),
          placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u041C\u043E\u0436\u043D\u043E \u0441 \u0440\u043E\u0437\u043E\u0432\u044B\u043C\u0438 \u0448\u0438\u043F\u0430\u043C\u0438? \u0418\u043B\u0438 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043E\u0441\u043E\u0431\u044B\u0435 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F...",
          className: "w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-all duration-300 ease-in-out transform focus:scale-[1.01] font-light",
          rows: "4"
        }
      ), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-stone-400 mt-2 font-light" }, "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0438 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u0437\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043C\u0430\u0441\u0442\u0435\u0440\u0443")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: closeOrderForm,
          className: "flex-1 py-3 px-4 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] font-light"
        },
        "\u041E\u0442\u043C\u0435\u043D\u0430"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: handleOrderSubmit,
          className: "flex-1 py-3 px-4 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl transition-all duration-400 ease-out transform hover:scale-[1.02] hover:shadow-md shadow-sm font-light"
        },
        "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437"
      )), /* @__PURE__ */ React.createElement("div", { className: "mt-4 p-4 bg-rose-50 rounded-xl" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs text-stone-600 font-light" }, '\u{1F4F1} \u041F\u043E\u0441\u043B\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u044F "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437" \u0431\u0443\u0434\u0435\u0442 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u0443 \u0432 Telegram')))
    ));
  };
  const CustomOrderFormModal = () => {
    if (!customOrderForm.isOpen) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/95 backdrop-blur-sm rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl" }, /* @__PURE__ */ React.createElement("div", { className: "sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-100 p-6 rounded-t-3xl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, "\u2728"), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-light text-stone-800" }, "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E")), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: closeCustomOrderForm,
        className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-stone-400" }, "\u2715")
    )), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-stone-600 leading-relaxed font-light" }, "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0432\u0438\u0434\u0435\u043D\u0438\u0435 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043B\u044C\u0446\u0430, \u0438 \u043C\u044B \u0432\u043E\u043F\u043B\u043E\u0442\u0438\u043C \u0435\u0433\u043E \u0432 \u0441\u0442\u0435\u043A\u043B\u0435")), /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-light text-stone-700 mb-3" }, "\u{1F3A8} \u0426\u0432\u0435\u0442 \u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: customOrderForm.colorIdea,
        onChange: (e) => setCustomOrderForm((prev) => ({ ...prev, colorIdea: e.target.value })),
        placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0435 \u0441\u0442\u0435\u043A\u043B\u043E \u0441 \u0437\u043E\u043B\u043E\u0442\u0438\u0441\u0442\u044B\u043C\u0438 \u0432\u043A\u0440\u0430\u043F\u043B\u0435\u043D\u0438\u044F\u043C\u0438, \u043C\u0430\u0442\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u043D\u044B\u0439 \u0441 \u0433\u043B\u044F\u043D\u0446\u0435\u0432\u044B\u043C\u0438 \u043F\u043E\u043B\u043E\u0441\u0430\u043C\u0438...",
        className: "w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light",
        rows: "3"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-light text-stone-700 mb-3" }, "\u{1F537} \u0424\u043E\u0440\u043C\u0430 \u0438 \u0434\u0438\u0437\u0430\u0439\u043D"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: customOrderForm.shapeIdea,
        onChange: (e) => setCustomOrderForm((prev) => ({ ...prev, shapeIdea: e.target.value })),
        placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u043E\u0432\u0430\u043B\u044C\u043D\u043E\u0435 \u0441 \u043E\u0441\u0442\u0440\u044B\u043C\u0438 \u043A\u0440\u0430\u044F\u043C\u0438, \u0448\u0438\u0440\u043E\u043A\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0441 \u0443\u0437\u043E\u0440\u043E\u043C \u0432\u043D\u0443\u0442\u0440\u0438, \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u0438\u0441\u0442\u0438\u0447\u043D\u0430\u044F \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F...",
        className: "w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light",
        rows: "3"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-light text-stone-700 mb-3" }, "\u{1F4A1} \u041E\u0431\u0449\u0430\u044F \u0438\u0434\u0435\u044F \u0438\u043B\u0438 \u0432\u0434\u043E\u0445\u043D\u043E\u0432\u0435\u043D\u0438\u0435"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: customOrderForm.generalIdea,
        onChange: (e) => setCustomOrderForm((prev) => ({ ...prev, generalIdea: e.target.value })),
        placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u043A\u043E\u043B\u044C\u0446\u043E \u0432 \u0441\u0442\u0438\u043B\u0435 \u043C\u043E\u0440\u0441\u043A\u043E\u0439 \u0432\u043E\u043B\u043D\u044B, \u043A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430, \u0432\u0438\u043D\u0442\u0430\u0436\u043D\u0430\u044F \u044D\u043B\u0435\u0433\u0430\u043D\u0442\u043D\u043E\u0441\u0442\u044C, \u043F\u043E\u0434\u0440\u0430\u0436\u0430\u043D\u0438\u0435 \u043A\u0440\u0438\u0441\u0442\u0430\u043B\u043B\u0443 \u043B\u044C\u0434\u0430...",
        className: "w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light",
        rows: "4"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-light text-stone-700 mb-3" }, "\u{1F4B0} \u041F\u0440\u0438\u043C\u0435\u0440\u043D\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)"), /* @__PURE__ */ React.createElement(
      "select",
      {
        value: customOrderForm.budget,
        onChange: (e) => setCustomOrderForm((prev) => ({ ...prev, budget: e.target.value })),
        className: "w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light"
      },
      /* @__PURE__ */ React.createElement("option", { value: "" }, "\u041D\u0435 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C"),
      /* @__PURE__ */ React.createElement("option", { value: "\u0434\u043E 5000\u20BD" }, "\u0434\u043E 5000\u20BD"),
      /* @__PURE__ */ React.createElement("option", { value: "5000-8000\u20BD" }, "5000-8000\u20BD"),
      /* @__PURE__ */ React.createElement("option", { value: "8000-12000\u20BD" }, "8000-12000\u20BD"),
      /* @__PURE__ */ React.createElement("option", { value: "\u043E\u0442 12000\u20BD" }, "\u043E\u0442 12000\u20BD"),
      /* @__PURE__ */ React.createElement("option", { value: "\u043E\u0431\u0441\u0443\u0434\u0438\u043C" }, "\u041E\u0431\u0441\u0443\u0434\u0438\u043C \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E")
    )), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-light text-stone-700 mb-3" }, "\u23F0 \u0416\u0435\u043B\u0430\u0435\u043C\u044B\u0435 \u0441\u0440\u043E\u043A\u0438 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)"), /* @__PURE__ */ React.createElement(
      "select",
      {
        value: customOrderForm.timeline,
        onChange: (e) => setCustomOrderForm((prev) => ({ ...prev, timeline: e.target.value })),
        className: "w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-colors font-light"
      },
      /* @__PURE__ */ React.createElement("option", { value: "" }, "\u041D\u0435 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C"),
      /* @__PURE__ */ React.createElement("option", { value: "1-2 \u043D\u0435\u0434\u0435\u043B\u0438" }, "1-2 \u043D\u0435\u0434\u0435\u043B\u0438"),
      /* @__PURE__ */ React.createElement("option", { value: "2-4 \u043D\u0435\u0434\u0435\u043B\u0438" }, "2-4 \u043D\u0435\u0434\u0435\u043B\u0438"),
      /* @__PURE__ */ React.createElement("option", { value: "1-2 \u043C\u0435\u0441\u044F\u0446\u0430" }, "1-2 \u043C\u0435\u0441\u044F\u0446\u0430"),
      /* @__PURE__ */ React.createElement("option", { value: "\u043D\u0435 \u0441\u043F\u0435\u0448\u0443" }, "\u041D\u0435 \u0441\u043F\u0435\u0448\u0443, \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u0430\u0436\u043D\u0435\u0435")
    )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: closeCustomOrderForm,
        className: "flex-1 py-3 px-4 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-colors font-light"
      },
      "\u041E\u0442\u043C\u0435\u043D\u0430"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleCustomOrderSubmit,
        className: "flex-1 py-3 px-4 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl transition-all duration-300 shadow-sm font-light"
      },
      "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441"
    )), /* @__PURE__ */ React.createElement("div", { className: "mt-4 p-4 bg-rose-50 rounded-xl" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs text-stone-600 leading-relaxed font-light" }, "\u2728 \u041C\u0430\u0441\u0442\u0435\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u043E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439, \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u044D\u0441\u043A\u0438\u0437\u0430 \u0438 \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438")))));
  };
  return /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto bg-white min-h-screen" }, currentPage === "catalog" && /* @__PURE__ */ React.createElement(CatalogPage, null), currentPage === "reviews" && /* @__PURE__ */ React.createElement(ReviewsPage, null), currentPage === "delivery" && /* @__PURE__ */ React.createElement(DeliveryPage, null), /* @__PURE__ */ React.createElement(OrderFormModal, null), /* @__PURE__ */ React.createElement(CustomOrderFormModal, null));
};
var stdin_default = GlassRingsShop;
export {
  stdin_default as default
};
