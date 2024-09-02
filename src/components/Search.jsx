import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className="p-6 bg-[#3E4970]">
      <Input
        className="p-4"
        type="text"
        placeholder="Search on map"
        startDecorator={<SearchIcon />}
      />
    </div>
  );
};

export default Search;
