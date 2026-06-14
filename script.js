import fs from "fs";

const fileJSON = fs.readFileSync("./package.json", { encoding: "utf8", flag: "r" });

const dataObj = JSON.parse(fileJSON);

const dependencies = Object.keys(dataObj.dependencies);

// console.log(dependencies);

async function latestVersion(packageName) {
  try {
    const res = await fetch("https://registry.npmjs.org/" + packageName);
    const data = await res.json();
    return { package: packageName, license: data.license };
  } catch (err) {
    console.error(`Error fetching ${packageName}:`, err);
    return null;
  }
}

const fetchPackages = async (packages) => {
  return await Promise.all(packages.map((d) => latestVersion(d)));
};

const results = await fetchPackages(dependencies);

console.log(results);
