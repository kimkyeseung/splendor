import React from 'react'
import GithubCorner from 'react-github-corner'
import { THEME } from 'config'

export const Gc = ({ ...props }) => (
  <GithubCorner
    href="https://github.com/kimkyeseung/splendor"
    direction="right"
    target="_blank"
    bannerColor={THEME.title}
    {...props}
  />
)
