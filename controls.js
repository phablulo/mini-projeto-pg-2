N_AVAL  = 3
S_PONT = true
S_POLI = true
S_CURV = true

document.querySelector('#naval').addEventListener('input', e => {
  const n = parseInt(e.target.value)
  if (!isNaN(n)) {
    N_AVAL = n
  }
})
function ccheck(query, cb) {
  document.querySelector(query).addEventListener('change', e => {
    return cb(e.target.checked)
  })
}
ccheck('#spont', x => S_PONT = x)
ccheck('#spoli', x => S_POLI = x)
ccheck('#scurv', x => S_CURV = x)