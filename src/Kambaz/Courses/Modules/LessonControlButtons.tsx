import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "./GreenCheckmark";
export default function LessonControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckMark />
            <IoEllipsisVertical className="fs-4" />
        </div>);
}