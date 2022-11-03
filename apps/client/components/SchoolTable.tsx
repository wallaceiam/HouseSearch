import React from "react";
import Link from "next/link";

import { ISchool } from "../lib";
import OfstedRating from "./OfstedRating";

interface ValueMap {
  readonly [slug: string]: string;
}

interface SchoolRowPros {
  school: ISchool;
}

const SchoolRow = ({ school }: SchoolRowPros) => {
  const {
    slug,
    name,
    localAuthoritySlug,
    classification,
    schoolType,
    address,
    telephone,
    postcode,
    ofstedRating,
    lastInspDate,
  } = school as any;
  return (
    <tr>
      <td className="border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
        <Link
          href={{
            pathname: "/schools/[localAuthoritySlug]/[slug]/",
            query: {
              localAuthoritySlug,
              slug,
            },
          }}
        >
          {name}
        </Link>
      </td>
      <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-900">{classification}</div>
        <div className="text-gray-500">{schoolType}</div>
      </td>
      {/* <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">
        Front-end Developer
      </td> */}
      <td className="border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden lg:table-cell">
        <div className="text-gray-900">
          {address} {postcode}
        </div>
        <div className="text-gray-500">{telephone}</div>
      </td>
      <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
        <OfstedRating rating={ofstedRating} lastInspDate={lastInspDate} />
      </td>
      <td className="relative whitespace-nowrap border-b border-gray-200 py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit<span className="sr-only">, Lindsay Walton</span>
        </a>
      </td>
    </tr>
  );
};

interface SchoolTableProps {
  schools?: ISchool[];
}

const SchoolTable = ({ schools }: SchoolTableProps) => {
  return (
    <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            Name
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
          >
            Type
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
          >
            Address
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
          >
            Rating
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
          >
            {/* <span className="sr-only">Edit</span> */}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {schools &&
          schools.map((school) => (
            <SchoolRow key={school.slug} school={school} />
          ))}
      </tbody>
    </table>
  );
};

export default SchoolTable;
