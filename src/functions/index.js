export default function taggle() {
  const elements = document.querySelectorAll('.actived');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < elements.length; i++) {
    const current = document.getElementsByClassName('actived');
    current[0].classList.remove('actived');
    // this.className += '_actived';
  }
}

export const generateUniqueKey = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    `${s4()
      + s4()
    }-${
      s4()
    }-${
      s4()
    }-${
      s4()
    }-${
      s4()
    }${s4()
    }${s4()}`
  );
};

export function checkdate(dateFrom, dateTo) {
  // verifie si la date du jour est entre les 2 dates passées.
  const dateToday = new Date();
  const dateTodayFr = dateToday.toLocaleDateString('fr-FR');
  const dateCheck = dateTodayFr;

  const d1 = dateFrom.split('/');
  const d2 = dateTo.split('/');
  const c = dateCheck.split('/');

  const from = new Date(d1[2], parseInt(d1[1], 10) - 1, d1[0]); // -1 because months are from 0 to 11
  const to = new Date(d2[2], parseInt(d2[1], 10) - 1, d2[0]);
  const check = new Date(c[2], parseInt(c[1], 10) - 1, c[0]);
  console.log(from)
  console.log(to)
  console.log(check)
  return (check >= from && check <= to);
};