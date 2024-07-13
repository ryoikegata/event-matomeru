'use client';
import { Header } from "@/layout/Header/page";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from "@mui/icons-material/Add";
import React, { useCallback, useState } from "react";
import { SwipeableDrawer } from "@/components/organisms/SwipeableDrawer/page";
import { CreateTenantForm } from "@/components/organisms/CreateTenantForm/page";

const data = [
  { id: 1, tenantName: 'テナント1' },
  { id: 2, tenantName: 'テナント2' },
  { id: 3, tenantName: 'テナント3' },
  { id: 4, tenantName: 'テナント4' },
  { id: 5, tenantName: 'テナント5' },
  { id: 6, tenantName: 'テナント6' },
  { id: 7, tenantName: 'テナント7' },
  { id: 8, tenantName: 'テナント8' },
  { id: 9, tenantName: 'テナント9' },
  { id: 10, tenantName: 'テナント10' },
];
export default function AdminHome() {
  const [addTenantModal, setAddTenantModal] = useState<boolean>(false);
  const handleAddTenantModal = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setAddTenantModal(true);
    },
    []
  );
  return (
    <>
      <Header />
      <main className="px-6 flex flex-col mt-20">
        <p className="pt-2 text-lg">ようこそ！ 管理者さん</p>
        <h1 className="flex pt-6 text-3xl font-bold">テナント一覧</h1>
        <div className="mt-8">
          <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            <Table style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", borderRadius: "8px" }} sx={{ border: '2px solid #0584c7' }}>
              <TableHead style={{ width: "100%", backgroundColor: "#0584c7", position: "sticky", top: "0" }}>
                <TableRow style={{ width: "100%", display: "flex", alignItems: "center", textAlign: "center" }}>
                  <TableCell style={{ width: "100%", color: "white", fontWeight: "bold" }}>テナント名</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((tenant) => (
                  <TableRow key={tenant.id} style={{ width: "100%", display: "flex", alignItems: "center", textAlign: "center" }}>
                    <TableCell style={{ width: "70%" }}>{tenant.tenantName}</TableCell>
                    <TableCell style={{ width: "30%", textAlign: "center", color: "red" }}><button>削除</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
      <button onClick={handleAddTenantModal} className="absolute right-5 bottom-5 w-16 h-16 rounded-full bg-[#0584c7] text-white shadow-md">
        <AddIcon />
      </button>
      <SwipeableDrawer
        opened={addTenantModal}
        speed={300}
        onClose={() => setAddTenantModal(false)}
      >
        <CreateTenantForm />
      </SwipeableDrawer>
    </>
  )
}
