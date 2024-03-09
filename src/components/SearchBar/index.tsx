import ReactSelect from "react-select";
import { makes } from "../../constants";
import React, { FormEvent, useMemo, useState } from "react";
import { OptionType } from "../../types";
import { useSearchParams } from "react-router-dom";


// search button
const SearchButton = ({designs} : {designs: string}) => (
  <button className={`z-10 ml-3 ${designs}`}>
    <img src='/magnifying-glass.svg' width={40} height={40} />
  </button>
)


const SearchBar = () => {

  const [model,setModel] = useState<string>('')
  const [make, setMake] = useState<string>('')
  
  const [searchParams, setSearchParams] = useSearchParams()

  /*
   * We need to convert the 'makes' array to the format requested by the select library, 
   * i.e., from "bmw" to { value: "bmw", label: "bmw" }.
   
   * To prevent unnecessary calculations every time the component renders, 
   * we used useMemo to store the data in the cache.
   
  */

  const options: OptionType[] = useMemo(
    () =>
      makes.map((make) => ({
        label: make,
        value: make,
      })),
    []
  );


  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSearchParams({make,model})
  }

  return (
    <form onSubmit={handleSubmit} className="searchbar gap-3">
      <div className="searchbar__item">
        <ReactSelect defaultInputValue={searchParams.get('make')!} onChange={(e) => e && setMake(e.value)} className="w-full text-black" options={options} />
        <SearchButton designs='sm:hidden' />
      </div>
      <div className="searchbar__item">
        <img width={25} src="/model-icon.png" className="absolute ml-4" />
        <input
          defaultValue={searchParams.get('model')!}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setModel(e.target.value)}
          placeholder="Ex:Civic"
          type="text"
          className="searchbar__input rounded text-black"
        />
        <SearchButton designs='sm:hidden' />
      </div>

      <SearchButton designs='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
