let largeDataset = [];
const itemHeight = 30; 
const buffer = 5; 
const container = document.getElementById('container');
const virtualList = document.getElementById('virtual-list');

// Function to render the visible items based on scroll
function renderVisibleItems() {
  const scrollTop = container.scrollTop;
  const viewportHeight = container.clientHeight;

  // Only proceed if the dataset is loaded
  if (largeDataset.length === 0) return;

  const totalItems = largeDataset.length;
  
  // Set the total height of the virtual list
  virtualList.style.height = `${totalItems * itemHeight}px`;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(totalItems - 1, Math.floor((scrollTop + viewportHeight) / itemHeight) + buffer);

  virtualList.innerHTML = ''; 

  const fragment = document.createDocumentFragment();

  for (let i = startIndex; i <= endIndex; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerText = largeDataset[i]?.name || `Item ${i + 1}`; // Fallback in case of missing names
    item.style.height = `${itemHeight}px`;
    item.style.position = 'absolute';
    item.style.top = `${i * itemHeight}px`; 
    fragment.appendChild(item);
  }

  virtualList.appendChild(fragment);
}

fetch('../../mockdata/clientData.json')
  .then(response => response.json())
  .then(data => {
    largeDataset = data;
    console.log('Dataset loaded:', largeDataset.length);
    
    renderVisibleItems();
  })
  .catch(error => console.error('Error loading JSON:', error));

container.addEventListener('scroll', renderVisibleItems);