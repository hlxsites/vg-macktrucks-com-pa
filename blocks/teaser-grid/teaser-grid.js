export default function decorate(block) {
  const children = [...block.children];

  const teaserGridList = document.createElement('ul');
  teaserGridList.classList.add('teaser-grid-list');

  children.forEach((e, idx) => {
    const teaserGridItem = document.createElement('li');
    teaserGridItem.classList.add('teaser-grid-item', `teaser-grid-item-${idx + 1}`);

    const imageUrl = e.querySelector('picture source').getAttribute('srcset');
    const imageHeight = e.querySelector('picture img').getAttribute('height');
    const imageWidth = e.querySelector('picture img').getAttribute('width');

    const linkUrl = e.querySelector('u').innerText;
    const texts = e.querySelectorAll('li');

    const buttonText = texts[0].innerText;
    const title = texts[1].innerText;
    let subtitle = texts[2].innerText;
    subtitle = `${subtitle} >`;

    let categoriesUrl = buttonText.replaceAll(' ', '-').toLowerCase();
    categoriesUrl = `${window.location.href}/categories/${categoriesUrl}`;

    const cardSize = `height: calc(${imageHeight} / ${imageWidth} * (100vw - 10px));`;

    teaserGridItem.innerHTML = `
        <div class='teaser-card-background' style="background-image: url('${imageUrl}')">
          <div class='teaser-card-content' style="${cardSize}">
            <a class='teaser-button teaser-button-${idx + 1}' href=${categoriesUrl}>
              ${buttonText}
            </a>
            <a class='teaser-link' href=${linkUrl}>
              <h3 class='teaser-title'>
                ${title}
              </h3>
              <h4 class='teaser-subtitle'>
                ${subtitle}
              </h4>
            </a>
          </div>
        </div>`;
    teaserGridList.append(teaserGridItem);
  });

  block.textContent = '';
  block.append(teaserGridList);
}
