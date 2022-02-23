import QRCode from "qrcode";
import Utils from "qrcode/lib/renderer/utils";

const createComponent = async () => {

    const componentConfig = ({
        data: {
          link:"https://developers.tiki.vn",
          size: 0,
        },
        onInit() {
            this.generateQR = this.generateQR.bind(this)
        },
        methods: {
            async tapButton() {
                return await this.generateQR(this.data.link)
            },
            generateQR(url) {
                return new Promise((resolve,reject) => {
                    try {
                        const canvas = my.createCanvasContext("qr-code");
                        const opts = Utils.getOptions({});
                        const qrData = QRCode.create(url);
                        const size = Utils.getImageWidth(qrData.modules.size, opts);
                        this.setData({ size, qrData });
                        canvas.getImageData({
                            width: size,
                            height: size,
                            success:(image)=> {
                             try {
                                Utils.qrToImageData(image.data, qrData, opts);
                                canvas.putImageData(image,0,0);
                                this.setData({ size, image: image.data }); 
                                resolve()
                             } catch (error) {
                                 reject(error)
                             }
                            },
                            
                            
                        });
                    } catch (error) {
                        console.error("generateQR", error)
                        //   I dont want to handle error here, just want to show the log
                        throw error;
                    }
                })
            }
        }
    });
      Component(componentConfig);
    return componentConfig
} 
if (!my.TEST  ) {
    createComponent();
}

export default createComponent;