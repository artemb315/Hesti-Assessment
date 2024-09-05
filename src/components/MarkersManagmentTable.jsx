import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Table,
  Button,
  Typography,
  Sheet,
  FormControl,
  FormLabel,
  IconButton,
  ListItemDecorator,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Link,
  Select,
  Option,
  selectClasses,
} from "@mui/joy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";

import ManagementInput from "./ManagementInput";
import CheckIconButton from "./CheckIconButton";
import CloseIconButton from "./CloseIconButton";
import CancelButton from "./CancelButton";
import SaveButton from "./SaveButton";

import { setStatus } from "../store/slices/globalSlice";
import {
  newCurrentMarker,
  setSelectedMarkerId,
  setEditingId,
  setCurrentMarkerName,
  setEditingMarkerName,
  setCurrentMarkerPosition,
  setEditingMarkerPosition,
  resetMarker,
  addMarker,
  removeMarker,
} from "../store/slices/markerSlice";
import {
  NORMAL_STATUS,
  MARKER_ADDING_STATUS,
  MARKER_EDITING_STATUS,
} from "../constants";

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "coordinates",
    numeric: false,
    disablePadding: false,
    label: "Coordinates",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          const isActions = headCell.id === "actions";
          return isActions ? (
            <th key={headCell.id}>Actions</th>
          ) : (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? { asc: "ascending", desc: "descending" }[order]
                  : undefined
              }
            >
              <Link
                underline="none"
                color="neutral"
                textColor={active ? "primary.plainColor" : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon
                      sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                    />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon
                      sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                    />
                  ) : null
                }
                sx={{
                  fontWeight: "lg",
                  "& svg": {
                    transition: "0.2s",
                    transform:
                      active && order === "desc"
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  },
                  "&:hover": { "& svg": { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ComplexRow = ({
  marker,
  formatNumber,
  formatPosition,
  isEditing = false,
}) => {
  const dispatch = useDispatch();

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    setLat(formatNumber(marker?.position?.lat));
    setLng(formatNumber(marker?.position?.lng));
  }, [marker, formatNumber]);

  const handleUpdateName = (event) => {
    const name = event.target.value;

    if (isEditing) {
      dispatch(setEditingMarkerName(name));
    } else {
      dispatch(setCurrentMarkerName(name));
    }
  };

  const handleReset = () => {
    dispatch(resetMarker());
    dispatch(setStatus(NORMAL_STATUS));
  };

  const handleSave = () => {
    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (!isNaN(latNum) && !isNaN(lngNum)) {
      const updatedPosition = { lat: latNum, lng: lngNum };
      if (isEditing) {
        dispatch(setEditingMarkerPosition(updatedPosition));
      } else {
        dispatch(setCurrentMarkerPosition(updatedPosition));
        dispatch(addMarker());
      }
      handleReset();
    }
  };

  const handleClearPosition = () => {
    const nonPosition = { lat: 0, lng: 0 };
    if (isEditing) {
      dispatch(setEditingMarkerPosition(nonPosition));
    } else {
      dispatch(setCurrentMarkerPosition(nonPosition));
    }
  };

  return (
    <tr>
      <td>
        <ManagementInput
          type="name"
          value={marker.name}
          onChange={handleUpdateName}
        />
      </td>
      <td>
        <Select
          indicator={<KeyboardArrowDown />}
          placeholder={formatPosition(marker.position)}
          sx={{
            width: "100%",
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
        >
          <div className="px-2 pt-2">
            <div className="flex gap-2">
              <ManagementInput
                className="basis-3/7"
                type="number"
                value={lat}
                onChange={(event) => setLat(event.target.value)}
              />
              <ManagementInput
                className="basis-3/7"
                type="number"
                value={lng}
                onChange={(event) => setLng(event.target.value)}
              />
              <CloseIconButton
                className="basis-1/7"
                onClick={handleClearPosition}
              />
            </div>
            <div className="flex justify-center gap-4 p-4">
              <CancelButton className="basis-2/5" onClick={handleReset} />
              <SaveButton className="basis-3/5" onClick={handleSave} />
            </div>
          </div>
        </Select>
      </td>
      <td className="w-full flex justify-center gap-4">
        <CheckIconButton onClick={handleSave} />
        <CloseIconButton onClick={handleReset} />
      </td>
    </tr>
  );
};

export default function TableSortAndSelection() {
  const rows = useSelector((state) => state.marker.markers);
  const selectedId = useSelector((state) => state.marker.selectedId);
  const editingId = useSelector((state) => state.marker.editingId);
  const currentMarker = useSelector((state) => state.marker.currentMarker);
  const currentStatus = useSelector((state) => state.global.status);

  const dispatch = useDispatch();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (id) => () => {
    dispatch(setSelectedMarkerId(id));
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const handleAdd = () => {
    dispatch(setStatus(MARKER_ADDING_STATUS));
    dispatch(newCurrentMarker());
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };

  const formatPosition = (position) => {
    const formattedlat = formatNumber(position?.lat);
    const formattedlng = formatNumber(position?.lng);
    if (!position || !formattedlat || !formattedlng) return "";
    return `(${formattedlat}, ${formattedlng})`;
  };

  const formatNumber = (num) => {
    if (typeof num !== "number") return "";
    return `${num.toFixed(4)}`;
  };

  const handleEdit = (id) => (event) => {
    event.stopPropagation();
    dispatch(setEditingId(id));
    dispatch(setStatus(MARKER_EDITING_STATUS));
  };

  const handleDelete = (id) => () => {
    dispatch(removeMarker(id));
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Sheet sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}>
      <Table
        aria-labelledby="tableTitle"
        borderAxis="xBetween"
        variant="plain"
        hoverRow={!!rows.length}
        sx={{
          "--TableCell-headBackground": "transparent",
          "--TableCell-selectedBackground": "#F1DAFF",
          "& thead": {
            height: "56px",
            color: "#253057",
          },
          "& thead th:nth-child(1)": {
            width: "35%",
            padding: "16px",
          },
          "& thead th:nth-child(2)": {
            width: "50%",
            padding: "16px",
          },
          "& thead th:nth-child(3)": {
            textAlign: "center",
            width: "15%",
            padding: "16px",
          },
          "& tr > td": {
            padding: "10px 16px 10px 16px",
          },
          "& tr > td:nth-child(3)": {
            color: "#253057",
            textAlign: "center",
          },
        }}
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <tbody>
          {rows.length || currentStatus === MARKER_ADDING_STATUS ? (
            [...rows]
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = selectedId === row.id;
                const isEditing = editingId === row.id;

                if (isEditing) {
                  return (
                    <ComplexRow
                      key={row.id}
                      marker={row}
                      formatNumber={formatNumber}
                      formatPosition={formatPosition}
                      isEditing={isEditing}
                    />
                  );
                }

                return (
                  <tr
                    onClick={handleClick(row.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    style={
                      isItemSelected
                        ? {
                            "--TableCell-dataBackground":
                              "var(--TableCell-selectedBackground)",
                            "--TableCell-headBackground":
                              "var(--TableCell-selectedBackground)",
                          }
                        : {}
                    }
                  >
                    <td>{row.name}</td>
                    <td>{formatPosition(row.position)}</td>
                    <td>
                      <Dropdown>
                        <MenuButton
                          slots={{ root: IconButton }}
                          slotProps={{
                            root: { variant: "plain", color: "neutral" },
                          }}
                          sx={{
                            "&:hover": {
                              color: "#57167E",
                              borderRadius: "50%",
                              border: "1px solid #57167E",
                              backgroundColor: "transparent",
                            },
                          }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <MoreVertIcon />
                        </MenuButton>
                        <Menu>
                          <MenuItem
                            sx={{
                              "&:hover": {
                                backgroundColor: "#F1DAFF",
                              },
                            }}
                            onClick={handleEdit(row.id)}
                          >
                            <ListItemDecorator>
                              <EditIcon />
                            </ListItemDecorator>{" "}
                            Edit
                          </MenuItem>
                          <MenuItem
                            sx={{
                              "&:hover": {
                                backgroundColor: "#F1DAFF",
                              },
                            }}
                            onClick={handleDelete(row.id)}
                          >
                            <ListItemDecorator sx={{ color: "inherit" }}>
                              <DeleteIcon />
                            </ListItemDecorator>{" "}
                            Delete
                          </MenuItem>
                        </Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td colSpan={3}>
                <div className="flex flex-col gap-4 justify-center items-center w-full h-[30vh]">
                  <span className="text-lg text-[#3E4970]">
                    There are no markers
                  </span>
                  <Button
                    variant="outlined"
                    startDecorator={<AddOutlinedIcon />}
                    sx={{
                      color: "#57167E",
                      borderColor: "#57167E",
                      "&:hover": {
                        backgroundColor: "rgba(87, 22, 126, 0.2)",
                      },
                    }}
                    onClick={handleAdd}
                  >
                    Add your first marker
                  </Button>
                </div>
              </td>
            </tr>
          )}
          {currentStatus === MARKER_ADDING_STATUS && (
            <ComplexRow
              marker={currentMarker}
              formatNumber={formatNumber}
              formatPosition={formatPosition}
            />
          )}
          {emptyRows > 0 && (
            <tr
              style={{
                height: `calc(${emptyRows} * 40px)`,
                "--TableRow-hoverBackground": "transparent",
              }}
            >
              <td colSpan={6} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select
                    onChange={handleChangeRowsPerPage}
                    value={rowsPerPage}
                  >
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                  </Select>
                </FormControl>
                <Typography sx={{ textAlign: "center", minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: rows.length === -1 ? -1 : rows.length,
                  })}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      rows.length !== -1
                        ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
}
