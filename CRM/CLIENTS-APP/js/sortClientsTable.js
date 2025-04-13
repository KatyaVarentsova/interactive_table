export const sortTable = () => {
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');

    const directions = Array.from(headers).map(() => '');

    const transform = (type, content) => {
        switch (type) {
            case 'id':
                return parseFloat(content);
            case 'create':
            case 'update':
                const cleanedContent = content.replace(/[.:]/g, '');
                const components = cleanedContent.match(/.{1,2}/g);
                console.log(components);
                return components[2] + components[3] + components[1] + components[0] + components[4] + components[5];
            case 'text':
            default:
                return content;
        }
    }

    const sortColumn = (index) => {
        const type = headers[index].getAttribute('data-type');
        const rows = tbody.querySelectorAll('tr');
        const direction = (type === 'id') ? (directions[index] || 'sortDown') : (directions[index] || 'sortUp');
        const multiply = direction === 'sortUp' ? 1 : -1;
        const newRows = Array.from(rows);

        newRows.sort((row1, row2) => {
            const cellA = row1.querySelectorAll('td')[index].textContent;
            const cellB = row2.querySelectorAll('td')[index].textContent;

            const a = transform(type, cellA);
            const b = transform(type, cellB);

            switch (true) {
                case a > b:
                    return 1 * multiply;
                case a < b:
                    return -1 * multiply;
                case a === b:
                    return 0;
                default:
                    break
            }
        });

        [].forEach.call(rows, (row) => {
            tbody.removeChild(row);
        });

        directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

        newRows.forEach(newRow => {
            tbody.appendChild(newRow);
        });

    }

    [].forEach.call(headers, (header, index) => {
        header.addEventListener('click', () => {
            sortColumn(index);
        });
    });
}