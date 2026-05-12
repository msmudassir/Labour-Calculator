const labourContainer =
  document.getElementById(
    "labourContainer"
  );


// DEFAULT ROWS

addLabourRow();
addLabourRow();

addExtraRow();


// SET TON

function setTon(value) {

  document.getElementById(
    "ton"
  ).value = value;

}


// ADD LABOUR ROW

function addLabourRow() {

  const row =
    document.createElement("div");

  row.className =
    "labour-row";

  row.innerHTML = `

    <div class="row g-3 align-items-center">

      <div class="col-md-5">

        <input
          type="text"
          class="form-control custom-input labour-name"
          placeholder="Labour Name"
        />

      </div>

      <div class="col-md-5">

        <select
          class="form-select work-select labour-work"
        >

          <option value="loading">
            Loading
          </option>

          <option value="unloading">
            Unloading
          </option>

          <option value="both">
            Both
          </option>

        </select>

      </div>

      <div class="col-md-2">

        <button
          class="btn btn-danger w-100 custom-input"
          onclick="removeRow(this)"
        >
          ✕
        </button>

      </div>

    </div>

  `;

  labourContainer.appendChild(row);

}


// ADD EXTRA ROW

function addExtraRow() {

  const row =
    document.createElement("div");

  row.className =
    "labour-row";

  row.innerHTML = `

    <div class="row g-3 align-items-center">

      <div class="col-md-4">

        <input
          type="text"
          class="form-control custom-input extra-name"
          placeholder="Labour Name"
        />

      </div>

      <div class="col-md-3">

        <input
          type="number"
          class="form-control custom-input extra-bags"
          placeholder="Bags"
        />

      </div>

      <div class="col-md-3">

        <select
          class="form-select work-select extra-work"
        >

          <option value="loading">
            Loading
          </option>

          <option value="unloading">
            Unloading
          </option>

          <option value="both">
            Both
          </option>

        </select>

      </div>

      <div class="col-md-2">

        <button
          class="btn btn-danger w-100 custom-input"
          onclick="removeRow(this)"
        >
          ✕
        </button>

      </div>

    </div>

  `;

  document.getElementById(
    "extraContainer"
  ).appendChild(row);

}


// REMOVE ROW

function removeRow(button) {

  button
    .parentElement
    .parentElement
    .parentElement
    .remove();

}


// CALCULATE

function calculateTotals() {

  const ton =
    Number(
      document.getElementById(
        "ton"
      ).value
    );

  if (!ton) {

    alert(
      "Please enter truck ton"
    );

    return;
  }

  const totalBags =
    ton * 20;

  document.getElementById(
    "totalBags"
  ).innerText =
    `${totalBags} Bags`;

  const loadingRate =
    Number(
      document.getElementById(
        "loadingRate"
      ).value
    );

  const unloadingRate =
    Number(
      document.getElementById(
        "unloadingRate"
      ).value
    );

  const bothRate =
    Number(
      document.getElementById(
        "bothRate"
      ).value
    );

  const names =
    document.querySelectorAll(
      ".labour-name"
    );

  const works =
    document.querySelectorAll(
      ".labour-work"
    );

  let totals = {};

  // TRUCK WORK

  for (
    let i = 0;
    i < names.length;
    i++
  ) {

    const name =
      names[i].value.trim();

    const work =
      works[i].value;

    if (!name)
      continue;

    let amount = 0;

    if (work === "loading") {

      amount =
        totalBags * loadingRate;

    }

    else if (
      work === "unloading"
    ) {

      amount =
        totalBags * unloadingRate;

    }

    else {

      amount =
        totalBags * bothRate;

    }

    if (!totals[name]) {

      totals[name] = 0;

    }

    totals[name] += amount;

  }

  // EXTRA BAG WORK

  const extraNames =
    document.querySelectorAll(
      ".extra-name"
    );

  const extraBags =
    document.querySelectorAll(
      ".extra-bags"
    );

  const extraWorks =
    document.querySelectorAll(
      ".extra-work"
    );

  const extraLoadingRate =
    Number(
      document.getElementById(
        "extraLoadingRate"
      ).value
    );

  const extraUnloadingRate =
    Number(
      document.getElementById(
        "extraUnloadingRate"
      ).value
    );

  const extraBothRate =
    Number(
      document.getElementById(
        "extraBothRate"
      ).value
    );

  for (
    let i = 0;
    i < extraNames.length;
    i++
  ) {

    const name =
      extraNames[i]
        .value
        .trim();

    const bags =
      Number(
        extraBags[i].value
      );

    const work =
      extraWorks[i].value;

    if (!name || !bags)
      continue;

    let amount = 0;

    if (work === "loading") {

      amount =
        bags *
        extraLoadingRate;

    }

    else if (
      work === "unloading"
    ) {

      amount =
        bags *
        extraUnloadingRate;

    }

    else {

      amount =
        bags *
        extraBothRate;

    }

    if (!totals[name]) {

      totals[name] = 0;

    }

    totals[name] += amount;

  }

  // RESULT

  let resultHTML = "";

  for (
    let name in totals
  ) {

    resultHTML += `

      <div class="result-item">

        <div class="result-name">
          ${name}
        </div>

        <div class="result-amount">
          ₹${totals[name].toFixed(2)}
        </div>

      </div>

    `;

  }

  if (!resultHTML) {

    resultHTML = `

      <div class="empty-text">
        No Labour Entries
      </div>

    `;

  }

  document.getElementById(
    "resultContainer"
  ).innerHTML =
    resultHTML;

}


// RESET

function resetAll() {

  document.getElementById(
    "ton"
  ).value = "";

  labourContainer.innerHTML =
    "";

  document.getElementById(
    "extraContainer"
  ).innerHTML =
    "";

  addLabourRow();
  addLabourRow();

  addExtraRow();

  document.getElementById(
    "resultContainer"
  ).innerHTML = `

    <div class="empty-text">
      Results will appear here
    </div>

  `;

  document.getElementById(
    "totalBags"
  ).innerText =
    "0 Bags";

}