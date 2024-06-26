import dateFormat from "dateformat";
import moment from "moment";

const helpers = {
  postImage: function (p, size) {
    return p?.[`uagb_featured_image_src`]?.[size] || false;
  },

  formatDate: function (date, format = "mmm dS, yyyy") {
    if (!date) return date;
    date = new Date(date);
    return dateFormat(date, format);
  },

  wrap: function (toWrap, wrapper) {
    wrapper = wrapper || content.createElement("div");
    toWrap.parentNode.appendChild(wrapper);
    return wrapper.appendChild(toWrap);
  },

  toFraction: (x, tolerance) => {
    if (x == 0) return [0, 1];
    if (x < 0) x = -x;
    if (!tolerance) tolerance = 0.0001;
    var num = 1,
      den = 1;

    function iterate() {
      var R = num / den;
      if (Math.abs((R - x) / x) < tolerance) return;

      if (R < x) num++;
      else den++;
      iterate();
    }

    iterate();
    return [num, den];
  },

  decodeHtml: function (html) {
    if (typeof document === "undefined") return html;
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  },

  getPhotoMeta: function (p) {
    if (!p) return p;
    const newPhoto = {
      ...p,
      photoMeta: p?.better_featured_image?.media_details?.image_meta
        ? p?.better_featured_image?.media_details?.image_meta
        : false,
    };
    return {
      ...newPhoto,
      dateTaken: helpers.getPhotoDateTaken(newPhoto),
    };
  },

  getPhotoDateTaken: function (photo) {
    if (!photo) return null;

    /**
     * Value can be one of:
     * - photo.acf.date_taken
     * - photo.photoMeta.created_timestamp
     * - photo.date
     */

    return photo?.acf?.date_taken
      ? moment(moment(photo.acf.date_taken).toDate())
      : photo.photoMeta.created_timestamp &&
        photo.photoMeta.created_timestamp !== "0"
      ? isNaN(photo.photoMeta.created_timestamp)
        ? moment(photo.photoMeta.created_timestamp)
        : moment.unix(photo.photoMeta.created_timestamp)
      : moment(moment(photo.date));
  },

  toTitleCase: function (str) {
    const articles = ["a", "an", "the"];
    const conjunctions = ["for", "and", "nor", "but", "or", "yet", "so"];
    const prepositions = [
      "with",
      "at",
      "from",
      "into",
      "upon",
      "of",
      "to",
      "in",
      "for",
      "on",
      "by",
      "like",
      "over",
      "plus",
      "but",
      "up",
      "down",
      "off",
      "near",
    ];

    // The list of spacial characters can be tweaked here
    const replaceCharsWithSpace = (str) =>
      str.replace(/[^0-9a-z&/\\]/gi, " ").replace(/(\s\s+)/gi, " ");
    const capitalizeFirstLetter = (str) =>
      str.charAt(0).toUpperCase() + str.substr(1);
    const normalizeStr = (str) => str.toLowerCase().trim();
    const shouldCapitalize = (word, fullWordList, posWithinStr) => {
      if (posWithinStr == 0 || posWithinStr == fullWordList.length - 1) {
        return true;
      }

      return !(
        articles.includes(word) ||
        conjunctions.includes(word) ||
        prepositions.includes(word)
      );
    };

    str = replaceCharsWithSpace(str);
    str = normalizeStr(str);

    let words = str.split(" ");
    if (words.length <= 2) {
      // Strings less than 3 words long should always have first words capitalized
      words = words.map((w) => capitalizeFirstLetter(w));
    } else {
      for (let i = 0; i < words.length; i++) {
        words[i] = shouldCapitalize(words[i], words, i)
          ? capitalizeFirstLetter(words[i], words, i)
          : words[i];
      }
    }

    return words.join(" ");
  },

  generatePostURL: function (post) {
    const path =
      post.type === "post"
        ? "blog"
        : post.type === "photo"
        ? "photos"
        : "portfolio";
    if (!post) return "";
    return `/${path}/${post.slug}`;
  },
};

export default helpers;
