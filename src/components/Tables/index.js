import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import {
  Table,
  TableData,
  TableHeader,
  Pagination,
  PaginationButton,
  PaginationInfo,
  PaginationDiv
} from './styles';

export default function Tables() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState([0]);
  const [allPages, setAllPages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    loadLocations();
  }, [page]);

  async function loadLocations() {
    const token = await localStorage.getItem('@userIdentificationGeoCode');
    const response = await api
      .get(`/address?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    if (response) {
      setLocations(response.data);

      const pages = await api.get(`/count`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAllPages(pages.data);
    }
  }

  async function nextPageClick() {
    await setPage(Number(page) + 1);
    await loadLocations();
  }

  async function PreviousPageClick() {
    await setPage(Number(page) - 1);
    await loadLocations();
  }

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <TableHeader>Rua</TableHeader>
            <TableHeader>Número</TableHeader>
            <TableHeader>Bairro</TableHeader>
            <TableHeader>Cidade</TableHeader>
            <TableHeader>Estado</TableHeader>
            <TableHeader>Latitude</TableHeader>
            <TableHeader>Longitude</TableHeader>
          </tr>

          {locations.map((item, index) => (
            <tr key={locations[index]._id}>
              <TableData>{locations[index].route}</TableData>
              <TableData>{locations[index].number}</TableData>
              <TableData>{locations[index].neighborhood}</TableData>
              <TableData>{locations[index].city}</TableData>
              <TableData>{locations[index].state}</TableData>
              <TableData>{locations[index].latitude}</TableData>
              <TableData>{locations[index].longitude}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {page <= 0 ? (
          ''
        ) : (
          <PaginationButton onClick={() => PreviousPageClick()}>
            Anterior
          </PaginationButton>
        )}
        <PaginationInfo>Página {page}</PaginationInfo>
        {page >= allPages ? (
          ''
        ) : (
          <PaginationButton onClick={() => nextPageClick()}>
            Próxima
          </PaginationButton>
        )}
      </Pagination>
    </>
  );
}
