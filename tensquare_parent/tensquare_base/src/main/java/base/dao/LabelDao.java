package base.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import base.pojo.Label;

public interface LabelDao extends JpaRepository<Label,String>, JpaSpecificationExecutor<Label> {

}
