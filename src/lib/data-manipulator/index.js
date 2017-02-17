
export default class DataManipulator {
    static changePageRowSize(index, value) {
        // TODO: Add functionality to handle page row size change.
    }

    static getFilteredData(rows, value) {
        if (!value || value === '') {
            return rows;
        } else {
            return rows.filter((rowItem) => {
                let countFound = 0;
                Object.keys(rowItem).forEach((key) => {
                    const rowValue = rowItem[key].toString().toLowerCase();
                    if (rowValue.includes(value.toLowerCase())) {
                        countFound += 1;
                    }
                });
                return (countFound > 0);
            });
        }
    }

    static getSortedData(rows, field, order) {
        return rows.slice().sort((a, b) => {
            let sortValue = (a[field] > b[field]) ? 1 : -1;
            if (order === 'desc') {
                sortValue *= -1;
            }
            return sortValue;
        });
    }

    static goToNextPage(currentPage) {
        // TODO: Add functionality to handle going to the next page.
        // Note: This will need to accommodate for the row count displayed.
        return currentPage += 1;
    }

    static goToPreviousPage(currentPage) {
        // TODO: Add function to handle going to the previous page.
        // Note: This will need to accommodate for the row count displayed.
        return (currentPage === 1) ? 1 : currentPage - 1;
    }
}
