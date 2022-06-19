import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
} from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
interface DataProp {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  saveToArchive: boolean;
  fileUrl: string;
}

const NewsTable = () => {
  const { data, error }: { data?: DataProp[]; error?: any } = useSWR(
    "/api/news/all",
    fetcher
  );
  const router = useRouter();

  const handleDeleteClick = (id: string) => {
    axios.post(`/api/news/delete/${id}`);
    router.reload();
  };

  const handleUpdateClick = (id: string) => {
    router.push(`/article/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300, maxWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              Title
            </TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Archived</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((article) => {
            return (
              <TableRow
                key={article.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {article.title}
                </TableCell>
                <TableCell align="right">{article.description}</TableCell>
                <TableCell align="right">
                  {article.saveToArchive ? "Yes" : "No"}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleUpdateClick(article.id);
                  }}
                >
                  <EditIcon></EditIcon>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDeleteClick(article.id);
                  }}
                >
                  <DeleteIcon></DeleteIcon>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default NewsTable;
