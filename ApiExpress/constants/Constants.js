const OPTION = {
    maxAge: 1000 * 60 * 10, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,
}
const PER_PAGE=20;
const PAGE_SIZE=10;
export default{
    OPTION,
    PER_PAGE,
    PAGE_SIZE
}