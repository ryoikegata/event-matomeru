import { FC } from "react";
import Image from "next/image";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';



export const UserStatusBlock = ({title}) => {
    const date = [
        {user:"本松達裕"},
        {user:"本松達裕"},
        {user:"本松達裕"},
        {user:"本松達裕"},
    ]
    return (
        // TODO: 各値はpropsで受け取る
        <div
        className="border-t-2 border-r-2 border-b-2 border-l-4 border-[#0584c7] py-2 px-4 rounded-lg cursor-pointer"
        >
        {/* <div className="flex justify-between">
            <h2>{title}</h2>
            <div></div>
        </div> */}
        <Accordion className=" shadow-none">
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
            >
            <Typography className="font-bold">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {date.map((user) => (
                    <Typography className="ml-2" key={user.user}>{user.user}</Typography>
                ))}
            </AccordionDetails>
        </Accordion>
        </div>
    );
};
