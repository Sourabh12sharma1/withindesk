-- WithinDesk private-beta waitlist for Hostinger MySQL / MariaDB.
-- Run this once in hPanel > Databases > phpMyAdmin (or the app will create
-- the same table automatically on the first form submit).

CREATE TABLE IF NOT EXISTS beta_requests (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(180) NOT NULL,
  organization VARCHAR(160) NOT NULL DEFAULT '',
  role VARCHAR(120) NOT NULL DEFAULT '',
  use_case VARCHAR(900) NOT NULL DEFAULT '',
  consent TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY beta_requests_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
