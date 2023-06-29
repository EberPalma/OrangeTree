
import { quicksand } from "@/fonts/fonts";

export default function Loader(){
    return (
        <div className="loader-container row justify-content-center">
            <div className="continuous-7"></div>
            <div className={`col-12 text-center ${quicksand.className}`}>
                <h3>Loading</h3>
            </div>
        </div>
    );
}