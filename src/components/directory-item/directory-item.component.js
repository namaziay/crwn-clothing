import {DirectoryItemContainer,BackgroundImage,Body} from './directory-item.styles.js';

const DirectoryItem = ({category}) => {
    const {imageUrl,title} = category;

    return(
        <DirectoryItemContainer>
          <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
          <Body to={`shop/${title}`}>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
      </DirectoryItemContainer>
    )
}

export default DirectoryItem