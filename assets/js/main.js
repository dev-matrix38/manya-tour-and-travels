// Manya Tour & Travels - Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Close menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled', 'shadow-xl');
    } else {
      navbar?.classList.remove('scrolled', 'shadow-xl');
    }
  });

  // 3. Package Filter Tabs
  const filterBtns = document.querySelectorAll('.pkg-filter-btn');
  const pkgCards = document.querySelectorAll('.pkg-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-700', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
      });

      btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
      btn.classList.add('bg-emerald-700', 'text-white', 'shadow-md');

      const category = btn.getAttribute('data-filter');

      pkgCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category').includes(category)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Quick Route / Taxi Fare Estimator
  const routeSelect = document.getElementById('calc-route');
  const vehicleSelect = document.getElementById('calc-vehicle');
  const fareResult = document.getElementById('calc-fare-display');
  const fareWhatsAppBtn = document.getElementById('calc-whatsapp-btn');

  const fareTable = {
    'kathgodam-kainchi': {
      name: 'Kathgodam to Kainchi Dham (Neeb Karori Baba)',
      distance: '42 km approx (1.5 hrs)',
      rates: { dzire: 2200, ertiga: 2800, innova: 3800, tempo: 6500 }
    },
    'haldwani-nainital': {
      name: 'Haldwani to Nainital Lake Sightseeing',
      distance: '35 km (1.2 hrs)',
      rates: { dzire: 1800, ertiga: 2400, innova: 3400, tempo: 5800 }
    },
    'kainchi-darshan-day': {
      name: 'Full Day Kainchi Dham + Golu Devta + Bhimtal',
      distance: '85 km circuit',
      rates: { dzire: 3200, ertiga: 3999, innova: 5200, tempo: 8500 }
    },
    'haldwani-pantnagar': {
      name: 'Pantnagar Airport Pickup / Drop',
      distance: '28 km',
      rates: { dzire: 1200, ertiga: 1600, innova: 2400, tempo: 4200 }
    },
    'chardham-kedarnath': {
      name: 'Char Dham Yatra / Kedarnath (Per Day Tariff)',
      distance: 'Hill Circuit',
      rates: { dzire: 4200, ertiga: 5500, innova: 7200, tempo: 11000 }
    },
    'adi-kailash-dharchula': {
      name: 'Haldwani to Dharchula / Adi Kailash Base',
      distance: '280 km Scenic Route',
      rates: { dzire: 6500, ertiga: 8500, innova: 11500, tempo: 18000 }
    }
  };

  function updateFare() {
    if (!routeSelect || !vehicleSelect || !fareResult) return;
    const route = routeSelect.value;
    const vehicle = vehicleSelect.value;

    if (fareTable[route] && fareTable[route].rates[vehicle]) {
      const price = fareTable[route].rates[vehicle];
      fareResult.innerHTML = `₹${price.toLocaleString('en-IN')}`;
      
      const vNames = { dzire: 'Swift Dzire (4 Seater)', ertiga: 'Ertiga UK02 TA 2121 (6 Seater)', innova: 'Innova Crysta (7 Seater)', tempo: 'Tempo Traveller (12-17 Seater)' };
      const msg = encodeURIComponent(`Hello Mr. Parvinder Singh! I am interested in taxi booking for:\nRoute: ${fareTable[route].name}\nVehicle: ${vNames[vehicle]}\nEstimated Fare: ₹${price}\nPlease confirm availability and details.`);
      
      if (fareWhatsAppBtn) {
        fareWhatsAppBtn.href = `https://wa.me/916005957610?text=${msg}`;
      }
    }
  }

  if (routeSelect && vehicleSelect) {
    routeSelect.addEventListener('change', updateFare);
    vehicleSelect.addEventListener('change', updateFare);
    updateFare();
  }

  // 5. Booking Modal Logic
  const bookingModal = document.getElementById('booking-modal');
  const openBookingBtns = document.querySelectorAll('.open-booking-modal');
  const closeBookingBtn = document.getElementById('close-booking-modal');

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefillPkg = btn.getAttribute('data-package-name') || '';
      const pkgInput = document.getElementById('modal-package');
      if (pkgInput && prefillPkg) {
        pkgInput.value = prefillPkg;
      }
      bookingModal?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBookingBtn && bookingModal) {
    closeBookingBtn.addEventListener('click', () => {
      bookingModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Close modal on background click
  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      bookingModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Handle Booking Form Submit -> WhatsApp
  const bookingForm = document.getElementById('quick-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-name')?.value || 'Guest';
      const phone = document.getElementById('modal-phone')?.value || '';
      const destination = document.getElementById('modal-package')?.value || 'Uttarakhand Tour';
      const date = document.getElementById('modal-date')?.value || 'Flexible';
      const passengers = document.getElementById('modal-passengers')?.value || '2';
      const notes = document.getElementById('modal-notes')?.value || 'No special requests';

      const whatsappText = `*New Booking Inquiry - Manya Tour & Travels*\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Contact:* ${phone}\n` +
        `📍 *Trip/Package:* ${destination}\n` +
        `📅 *Travel Date:* ${date}\n` +
        `👥 *Persons:* ${passengers}\n` +
        `📝 *Requirement:* ${notes}\n\n` +
        `Please share pricing and confirm availability. Thank you!`;

      const whatsappUrl = `https://wa.me/916005957610?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank');

      alert('Thank you! Redirecting you to WhatsApp to connect directly with Mr. Parvinder Singh Sachdeva.');
      bookingModal?.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // 6. Itinerary Detail Modal
  const packageDetails = {
    'kainchi-dham': {
      title: 'Kainchi Dham & Kumaon Temple Darshan (2 Days / 1 Night)',
      price: '₹3,499',
      duration: '2 Days / 1 Night',
      pickup: 'Kathgodam Railway Station / Haldwani',
      itinerary: [
        { day: 'Day 1', desc: 'Pickup from Kathgodam/Haldwani by dedicated Ertiga/Dzire cab. Scenic drive via Bhowali to Kainchi Dham (Neeb Karori Baba Ashram). Attend afternoon Aarti and meditate in the sanctum. Evening visit to Golu Devta Temple (Ghorakhal) and Bhimtal lake. Overnight stay at comfortable 3-star hill resort.' },
        { day: 'Day 2', desc: 'Morning darshan at Neem Karoli Baba Ashram. Proceed to Nainital for Naini Lake boat ride, Naina Devi Temple, and Mall Road exploration. Evening drop back to Kathgodam Railway Station or Haldwani.' }
      ],
      inclusions: ['Dedicated sanitized cab for 2 days', 'All tolls, driver charges & mountain parking', '1 Night hotel stay in Bhimtal/Nainital with breakfast', 'Temple darshan guidance'],
      exclusions: ['Personal shopping & lake boating charges', 'Meals other than breakfast']
    },
    'chardham': {
      title: 'Char Dham Yatra 2026 (10 Days / 9 Nights)',
      price: '₹24,999',
      duration: '10 Days / 9 Nights',
      pickup: 'Haldwani / Haridwar / Delhi',
      itinerary: [
        { day: 'Day 1-2', desc: 'Haldwani/Haridwar to Barkot via Mussoorie. Yamunotri Dham trek & sacred bath in Surya Kund.' },
        { day: 'Day 3-4', desc: 'Barkot to Uttarkashi. Visit sacred Kashi Vishwanath temple & divine Gangotri Dham on the banks of Bhagirathi river.' },
        { day: 'Day 5-7', desc: 'Drive to Guptkashi/Sonprayag. Kedarnath Dham trek / helicopter assistance. Divine darshan and evening Aarti at Kedarnath temple.' },
        { day: 'Day 8-10', desc: 'Drive to Badrinath Dham via Chopta and Joshimath. Darshan at Badrinath Temple, Mana Village (last Indian village). Return via Rishikesh to Haldwani.' }
      ],
      inclusions: ['All-inclusive transportation in commercial tourist cab', '9 Nights hotel accommodations', 'Daily breakfast and dinner (pure veg)', 'Biometric Yatra Registration & permit support'],
      exclusions: ['Helicopter tickets / pony / palki charges', 'Personal pooja charges']
    },
    'adi-kailash': {
      title: 'Adi Kailash & Om Parvat Yatra (5 Days / 4 Nights)',
      price: '₹14,999',
      duration: '5 Days / 4 Nights',
      pickup: 'Haldwani / Kathgodam / Dharchula',
      itinerary: [
        { day: 'Day 1', desc: 'Pickup from Haldwani/Kathgodam, scenic drive through Almora and Pithoragarh valleys to Dharchula border town. Night stay in Dharchula.' },
        { day: 'Day 2', desc: 'Inner Line Permit verification. 4x4 Mountain Bolero drive from Dharchula to Gunji/Nabi village along the roaring Kali River.' },
        { day: 'Day 3', desc: 'Early morning expedition to Om Parvat (witness the divine natural OM snow symbol) and Nabidhang. Cultural homestay night in Nabi.' },
        { day: 'Day 4', desc: 'Divine pilgrimage to Adi Kailash (Chhota Kailash) and sacred Parvati Sarovar. Return to Dharchula.' },
        { day: 'Day 5', desc: 'Scenic journey from Dharchula back to Haldwani / Kathgodam Railway Station.' }
      ],
      inclusions: ['Inner line permits, SDM paperwork & medical clearance help', 'Dedicated mountain vehicle with expert local Himalayan driver', 'Clean homestay stays at Gunji/Nabi & hotel at Dharchula', 'Authentic Pahadi meals (breakfast, lunch, dinner)'],
      exclusions: ['Personal gear, porter or pony hire']
    },
    'nainital-kumaon': {
      title: 'Nainital & Kumaon Lakes Sightseeing (3 Days / 2 Nights)',
      price: '₹4,999',
      duration: '3 Days / 2 Nights',
      pickup: 'Kathgodam / Haldwani',
      itinerary: [
        { day: 'Day 1', desc: 'Pickup from Kathgodam. Transfer to Nainital. Check-in and visit Naini Lake, Naina Devi Temple, Cave Garden, Snow View point and Tibetan Market.' },
        { day: 'Day 2', desc: 'Excursion to the famous Lake District: Bhimtal (island aquarium), Sattal (7 interconnected lakes), Naukuchiatal (9-cornered lake with paragliding).' },
        { day: 'Day 3', desc: 'Scenic trip to Mukteshwar (Chauli ki Jali, Mukteshwar Dham 350-year-old temple) with panoramic snow peak Himalayan views. Evening drop at Kathgodam.' }
      ],
      inclusions: ['AC Cab (Dzire/Ertiga) for entire trip', '2 Nights hotel stay with breakfast', 'All parking, tolls & driver allowances'],
      exclusions: ['Entry tickets, adventure sports & boat rides']
    }
  };

  const pkgModal = document.getElementById('package-details-modal');
  const closePkgModalBtn = document.getElementById('close-pkg-modal');
  const viewDetailBtns = document.querySelectorAll('.view-itinerary-btn');

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkgKey = btn.getAttribute('data-package-key');
      const data = packageDetails[pkgKey];

      if (data && pkgModal) {
        document.getElementById('pkg-modal-title').innerText = data.title;
        document.getElementById('pkg-modal-price').innerText = data.price;
        document.getElementById('pkg-modal-duration').innerText = data.duration;
        document.getElementById('pkg-modal-pickup').innerText = data.pickup;

        // Render itinerary
        const itinList = document.getElementById('pkg-modal-itinerary');
        itinList.innerHTML = data.itinerary.map(item => `
          <div class="border-l-2 border-emerald-600 pl-4 py-1">
            <span class="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded mb-1">${item.day}</span>
            <p class="text-sm text-gray-700 leading-relaxed">${item.desc}</p>
          </div>
        `).join('');

        // Render inclusions
        const incList = document.getElementById('pkg-modal-inclusions');
        incList.innerHTML = data.inclusions.map(inc => `
          <li class="flex items-center gap-2 text-sm text-gray-700">
            <svg class="h-4 w-4 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>${inc}</span>
          </li>
        `).join('');

        // Set booking button target
        const modalBookBtn = document.getElementById('pkg-modal-book-btn');
        if (modalBookBtn) {
          modalBookBtn.setAttribute('data-package-name', data.title);
        }

        pkgModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closePkgModalBtn && pkgModal) {
    closePkgModalBtn.addEventListener('click', () => {
      pkgModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  pkgModal?.addEventListener('click', (e) => {
    if (e.target === pkgModal) {
      pkgModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
});
