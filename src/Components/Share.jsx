import React from 'react'
import {
    EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
  
  } from "react-share";
  import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';


export default function Share({toast}) {
    const shareUrl = window.location.href
   

    const copyToClipboard = () => {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          console.log('URL copied to clipboard:', shareUrl);
          toast.success("Copied!")
          // You can add additional actions here, like displaying a success message
        })
        .catch((error) => {
          console.error('Failed to copy URL to clipboard:', error);
          // You can add handling for errors here
        });
    };
  return (
   <>
   <div className="Demo__container w-[100%] flex justify-center items-center flex-wrap">
   <div className="Demo__some-network">
   <div className=" rounded-[50%] h-[40px] flex items-center justify-center w-[40px] bg-slate-500 " onClick={copyToClipboard}>
   <ContentCopyRoundedIcon
   style={{color:"white",fontSize:"25px"}}
     url={shareUrl}
   
     body="body"
     className="Demo__some-network__share-button"
   >
     <ContentCopyRoundedIcon style={{color:"white"}} size={40} round />

   </ContentCopyRoundedIcon>
   </div>
 </div>
   <div className="Demo__some-network">
     <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
       <FacebookIcon
        size={40} round />
     </FacebookShareButton>

     <div>
     
     </div>
   </div>

   <div className="Demo__some-network">
     <FacebookMessengerShareButton
       url={shareUrl}
       appId="521270401588372"
       className="Demo__some-network__share-button"
     >
       <FacebookMessengerIcon size={40} round />
     </FacebookMessengerShareButton>
   </div>


   <div className="Demo__some-network">
     <TwitterShareButton
       url={shareUrl}
       
       className="Demo__some-network__share-button"
     >
       <XIcon size={40} round />
     </TwitterShareButton>
   </div>

   <div className="Demo__some-network">
     <TelegramShareButton
       url={shareUrl}
       
       className="Demo__some-network__share-button"
     >
       <TelegramIcon size={40} round />
     </TelegramShareButton>
   </div>

   <div className="Demo__some-network">
     <WhatsappShareButton
       url={shareUrl}
       
       separator=":: "
       className="Demo__some-network__share-button"
     >
       <WhatsappIcon size={40} round />
     </WhatsappShareButton>
   </div>

   


    
    
   


   
   
  

   <div className="Demo__some-network">
     <EmailShareButton
       url={shareUrl}
     
       body="body"
       className="Demo__some-network__share-button"
     >
       <EmailIcon size={40} round />
     </EmailShareButton>
   </div>
  

  
  



  

 </div>
   </>
  )
}
