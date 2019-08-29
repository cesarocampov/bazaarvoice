import React, { FunctionComponent } from 'react'
import Stars from './Stars'
import styles from '../styles.css'

const getTimeAgo = (time: string) => {
  let before = new Date(time)
  let now = new Date()
  let diff = new Date(now.valueOf() - before.valueOf())

  let minutes = diff.getUTCMinutes()
  let hours = diff.getUTCHours()
  let days = diff.getUTCDate() - 1
  let months = diff.getUTCMonth()
  let years = diff.getUTCFullYear() - 1970

  if (years != 0) {
    return `${years} ${years > 1 ? 'years' : 'year'} ago`
  } else if (months != 0) {
    return `${months} ${months > 1 ? 'months' : 'month'} ago`
  } else if (days != 0) {
    return `${days} ${days > 1 ? 'days' : 'day'} ago`
  } else if (hours != 0) {
    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
  } else {
    return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`
  }
}

const Review: FunctionComponent<ReviewProps> = ({review}) => {
  return (
    <div className={`${styles.review} bw2 bb b--muted-5 mb5 pb4`}>
      <div className={styles.reviewRating}>
        <Stars rating={review.Rating}/>
      </div>
      <h5 className={`${styles.reviewTitle} lh-copy mw9 t-heading-5 mv5`}>
        {review.Title}
      </h5>
      <ul className="pa0">
        <li className={`${styles.reviewSubmittedField} dib mr5`}>
          <strong>Submitted</strong> {getTimeAgo(review.SubmissionTime)}
        </li>
        <li className={`${styles.reviewByField} dib mr5`}>
          <strong>By</strong> {review.UserNickname}
        </li>
        <li className={`${styles.reviewFromField} dib`}>
          <strong>From</strong> {review.UserLocation}
        </li>
      </ul>
      <p className={`${styles.reviewText} t-body lh-copy mw9`}>{review.ReviewText}</p>
      {review.Photos.length ? (
        <div className={`${styles.reviewImagesContainer} mt6 flex items-start`}>
          {review.Photos.map((item: any, i: number) => {
            return (
              <img
                alt="Product"
                className={`${styles.reviewImage} w-20 db mb5`}
                key={i}
                src={item.Sizes.thumbnail.Url}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}



interface ReviewProps {
  review: any
}

export default Review