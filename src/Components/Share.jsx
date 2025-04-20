import React, { useRef } from 'react';
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
import { QRCodeSVG } from 'qrcode.react';
import { saveAs } from 'file-saver';

export default function Share({ toast, qrUrl }) {
    const baseUrl = window.location.origin;
    const fullQrUrl = `${baseUrl}${qrUrl}`;
    const qrRef = useRef(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullQrUrl)
            .then(() => {
                console.log('QR URL copied to clipboard:', fullQrUrl);
                toast.success("Copied!");
            })
            .catch((error) => {
                console.error('Failed to copy URL to clipboard:', error);
            });
    };

    const downloadQRCode = () => {
        if (qrRef.current) {
            const svg = qrRef.current.querySelector('svg');
            if (svg) {
                const svgData = new XMLSerializer().serializeToString(svg);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                        saveAs(blob, 'qr-code.png');
                    });
                };
                
                img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
            }
        }
    };

    return (
        <>
            <div className="Demo__container w-[100%] flex justify-center items-center flex-col">
                {/* QR Code Display and Download */}
                <div className="mb-4 flex flex-col items-center">
                    <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-md">
                        <QRCodeSVG
                            value={fullQrUrl}
                            size={200}
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                    <button
                        onClick={downloadQRCode}
                        className="mt-2 bg-[#062A27] text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <span className="mr-2">Download QR Code</span>
                    </button>
                </div>

                {/* Share Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="rounded-[50%] h-[40px] w-[40px] flex items-center justify-center bg-slate-500" onClick={copyToClipboard}>
                        <ContentCopyRoundedIcon style={{ color: "white", fontSize: "25px" }} />
                    </div>

                    <FacebookShareButton url={fullQrUrl} className="Demo__some-network__share-button">
                        <FacebookIcon size={40} round />
                    </FacebookShareButton>

                    <FacebookMessengerShareButton
                        url={fullQrUrl}
                        appId="521270401588372"
                        className="Demo__some-network__share-button"
                    >
                        <FacebookMessengerIcon size={40} round />
                    </FacebookMessengerShareButton>

                    <TwitterShareButton url={fullQrUrl} className="Demo__some-network__share-button">
                        <XIcon size={40} round />
                    </TwitterShareButton>

                    <TelegramShareButton url={fullQrUrl} className="Demo__some-network__share-button">
                        <TelegramIcon size={40} round />
                    </TelegramShareButton>

                    <WhatsappShareButton url={fullQrUrl} separator=":: " className="Demo__some-network__share-button">
                        <WhatsappIcon size={40} round />
                    </WhatsappShareButton>

                    <EmailShareButton url={fullQrUrl} body="body" className="Demo__some-network__share-button">
                        <EmailIcon size={40} round />
                    </EmailShareButton>
                </div>
            </div>
        </>
    );
}
