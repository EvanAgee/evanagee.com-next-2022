import React from "react";
import Link from "next/link";
import moment from "moment";
import helpers from "@/helpers";
import TagList from "@/components/TagList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBreakpoints from "@/hooks/useBreakpoints";

function PhotoSpecs({ photo }) {
  if (!photo) return null;
  const { breakpoint } = useBreakpoints();
  const photoMeta = React.useMemo(() => {
    return photo?.better_featured_image?.media_details?.image_meta ? photo?.better_featured_image?.media_details?.image_meta : false;
  }, [photo]);
  const shutterSpeed = photoMeta ? helpers.toFraction(photoMeta.shutter_speed) : false;
  if (!photo) return;

  return (
    <div className="photo-data-grid">
      <ul className="photo-data-grid__items grid grid-cols-6">
        <li className="photo-data-grid__items__item col-span-6 lg:col-span-2">
          <strong>Taken</strong>
          <div>{helpers.getPhotoMeta(photo).dateTaken.format("dddd, MMMM Do YYYY")}</div>
        </li>

        <li className="photo-data-grid__items__item col-span-6 lg:col-span-2">
          <strong>Uploaded</strong>
          <div>
            {moment(moment(photo.date).toDate()).format("dddd, MMMM Do YYYY")}
          </div>
        </li>

        <li className="photo-data-grid__items__item col-span-6 lg:col-span-2">
          <strong>Views</strong>
          <div>{photo?.acf?.view_count}</div>
        </li>

        <li className="photo-data-grid__items__item col-span-6 lg:col-span-3">
          <strong>
            <FontAwesomeIcon icon={["fas", "book-open"]} />
            &nbsp; Albums
          </strong>
          <div>
            {"ea_photo_albums" in photo && photo.ea_photo_albums.length > 0 ? (
              <TagList
                items={photo.ea_photo_albums.map((a, i) => ({
                  name: a.name,
                  link: `/photos/photo_album/${a.term_id}|${a.slug}`,
                }))}
              />
            ) : (
              <span>None</span>
            )}
          </div>
        </li>

        <li className="photo-data-grid__items__item col-span-6 lg:col-span-3">
          <strong>
            <FontAwesomeIcon icon={["fas", "tag"]} />
            &nbsp; Tags
          </strong>
          <div>
            {photo.ea_photo_tags ? (
              <TagList
                items={photo.ea_photo_tags.map((t) => ({
                  name: t.name,
                  link: `/photos/photo_tags/${t.term_id}|${t.slug}`,
                }))}
              />
            ) : (
              <div>None</div>
            )}
          </div>
        </li>

        <li className="photo-data-grid__items__item col-span-2 lg:col-span-2">
          <strong>Camera</strong>
          <div>
            {photoMeta.camera ? (
              <span v-if="photo.exif.Model">{photoMeta.camera}</span>
            ) : (
              <span>Unknown</span>
            )}
          </div>
        </li>

        <li className="photo-data-grid__items__item col-span-2 lg:col-span-2">
          <strong>Aperture</strong>
          <div>
            {photoMeta.aperture ? (
              <span v-if="photo.exif.FNumber">{photoMeta.aperture}</span>
            ) : (
              <span>Unknown</span>
            )}
          </div>
        </li>

        <li className="photo-data-grid__items__item col-span-2 lg:col-span-2">
          <strong>Shutter</strong>
          <div>
            {photoMeta.shutter_speed ? (
              <span>{`${shutterSpeed[0]}/${shutterSpeed[1]}`}</span>
            ) : (
              <span>Unknown</span>
            )}
          </div>
        </li>

        {"acf" in photo && "colors" in photo.acf && photo.acf.colors && (
          <li className="photo-data-grid__items__item col-span-6 lg:col-span-6">
            <strong>Colors</strong>
            <ul className="flex mb-0 w-full rounded-xl overflow-hidden">
              {photo.acf.colors.slice(0, breakpoint.isLgUp ? 10 : 5).map((c, i) => (
                <li
                  className="flex-1 h-6"
                  key={i}
                  style={{ backgroundColor: c.color }}
                ></li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default PhotoSpecs;
