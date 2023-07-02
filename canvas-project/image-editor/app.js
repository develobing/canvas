const canvas = document.querySelector('.image-area');
const ctx = canvas.getContext('2d');
let imageBuffer;

// Controls
const open = document.querySelector('.open');
const save = document.querySelector('.save');
const apply = document.querySelector('.apply');
const filters = document.querySelector('.filters');

// Events
open.addEventListener('change', handleOpen);
save.addEventListener('click', handleSave);
apply.addEventListener('click', handleApply);

// Functions
async function handleOpen(e) {
  const files = e.target.files;
  const buffer = await Utils.loadImage(files[0]);

  imageBuffer = buffer;
  ctx.drawImage(buffer, 0, 0);
}

function handleApply() {
  const filterToApply = filters.value;
  let newImage;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (filterToApply) {
    case 'none':
      newImage = imageBuffer;
      break;

    case 'grayscale':
      newImage = Filters.grayscale(imageBuffer);
      break;

    case 'sepia':
      newImage = Filters.sepia(imageBuffer);
      break;

    case 'brighten':
      newImage = Filters.brighten(imageBuffer);
      break;

    default:
      break;
  }

  if (newImage) ctx.drawImage(newImage, 0, 0);
}

function handleFilters(e) {
  if (e.target.name !== 'filter') return;
  const filter = Filters[e.target.value];
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const filteredData = filter(imageData);
  ctx.putImageData(filteredData, 0, 0);
}

function handleSave() {
  const link = document.createElement('a');
  link.download = Utils.randomFilename('png', 12);
  link.href = canvas.toDataURL();
  link.click();
}
