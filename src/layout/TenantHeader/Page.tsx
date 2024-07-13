import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const TenantHeader: FC = () => {

    const options = [
        { title: 'イベント一覧', url: '/tenant-owner', },
        { title: 'ユーザー画面へ', url: '/', },
        { title: 'ユーザー一覧', url: '/', },
        { title: 'ユーザー追加', url: '/', },
        { title: 'ログアウト', url: '/', },
    ];

    const ITEM_HEIGHT = 48;


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <header className="fixed top-0 w-full shadow-md px-6 py-4 flex items-center justify-between bg-white">
        <Link href={'/'}>
            <Image src="/logo.svg" alt="Logo" width={140} height={50} />
        </Link>
        <div>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
            },
            }}
        >
            {options.map((option) => (
            <Link key={option.title} href={option.url}>
                <MenuItem onClick={handleClose}>
                {option.title}
                </MenuItem>
            </Link>
            ))}
        </Menu>
        </div>
        </header>
    );
};
