import {FacebookIcon, FacebookShareButton, TwitterShareButton, XIcon} from "react-share";

export const Footer = ({fullUrl}) => {

  return (
    <footer>
      <div className={'container'}>
        <div>
        <br/>
        <FacebookShareButton url={fullUrl} >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
          {' '}
        <TwitterShareButton
          url={fullUrl}
        >
          <XIcon size={32} round />
        </TwitterShareButton>
      </div>
      </div>
    </footer>
  )
}