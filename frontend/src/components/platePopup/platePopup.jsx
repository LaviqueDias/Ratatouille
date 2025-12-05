import { Dialog } from "@mui/material"
import styles from './platePopup.module.css'

export default function PlatePopup({ plateData, onClose, onAddToCart }) {

    return(
        <Dialog
            open={true}
            onClose={onClose}
            PaperProps={{
                style: {
                    marginBlock: "2rem"  
                }
            }}
            sx={{
                "& .MuiDialog-paper": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }
            }}
        >
            <div className={styles.popupContainer}>
                <img src={plateData.imgUrl} alt="" />
                <div className={styles.popupContent}>
                    <h2>{plateData.name}</h2>
                    <p className={styles.ingredients}>[{String(plateData.ingredients)}]</p>
                    <p>{plateData.description}</p>
                    <h2>$ {plateData.price}</h2>
                    <button onClick={() => { onAddToCart(plateData) }}>Add to cart</button>
                </div>
            </div>
        </Dialog>
    )
}
